import { colors } from '@/configs';
import { getPlaceInfo } from '@/services/osm';
import { useMount } from 'ahooks';
import { Button, Input, message, Space, Spin } from 'antd';
import L from 'leaflet';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Geometry } from 'wkx-ts';
import { createPolygon, filterEmptyValue } from './GisUtil';
import type { OsmPolygonProps } from './OsmTypes';
import 'leaflet/dist/leaflet.css';
import './GisStyle.less';

const OsmIndex: React.FC = () => {
  const gisMap = useRef(null);

  const [loading, setLoading] = useState(false);
  const [osmList, setOsmList] = useState<OsmPolygonProps[]>([]);
  const [toolFlag, setToolFlag] = useState(true);
  const [labelFlag, setLabelFlag] = useState(true);

  const [geoMap, setGeoMap] = useState<L.Map>();

  const initMap = useCallback(() => {
    if (gisMap?.current) {
      const geomSRID = 3857;
      const geoMap = L.map(gisMap?.current, {
        crs: L.CRS.EPSG3857
      });
      setGeoMap(geoMap);

      // 工具栏
      const baseLayersObj = {
        Street: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxNativeZoom: 19,
          maxZoom: 24,
          id: 'carto.topo'
        }),
        Topography: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          maxZoom: 17,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,' +
            ' &copy; <a href="http://viewfinderpanoramas.org" target="_blank">SRTM</a>,' +
            ' &copy; <a href="https://opentopomap.org" target="_blank">OpenTopoMap</a>'
        })
      };
      L.control.layers(baseLayersObj).addTo(geoMap);

      // 版权信息
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxNativeZoom: 19,
        maxZoom: 24,
        id: 'carto.topo'
      }).addTo(geoMap);

      const ZoomViewer = L.Control.extend({
        onAdd() {
          const container = L.DomUtil.create('div');
          const gauge = L.DomUtil.create('div');
          container.style.width = '200px';
          container.style.background = 'rgba(255,255,255,0.5)';
          container.style.textAlign = 'left';
          geoMap.on('zoomstart zoom zoomend', (ev) => {
            gauge.innerHTML = `Zoom level: ${geoMap.getZoom()}`;
          });
          container.appendChild(gauge);
          return container;
        }
      });

      const zoomViewerControl = new ZoomViewer().addTo(geoMap);

      geoMap.setView([0, 0], 0);
    }
  }, []);

  const renderMap = useCallback(() => {
    if (geoMap) {
      if (osmList?.length) {
        osmList.forEach((item) => {
          const { osm_id, name, way, ...rest } = item;
          const { polygonList: sourceValues, polygonPoints } = createPolygon(`${way}`);

          // 从色卡中随机抽取一个颜色
          const randomColorIndex = Math.floor(Math.random() * colors.length);
          const randomColor = colors[randomColorIndex];

          const sourceTips: any = [
            {
              id: 'way',
              color: randomColor,
              info: filterEmptyValue({
                osm_id,
                name,
                way: `${polygonPoints}` || '-',
                ...rest
              }),
              location: '2:0'
            }
          ];

          const geojsonMarkerOptions = {
            radius: 4,
            weight: 3
          };
          const popupOption = {
            closeButton: true,
            minWidth: 260,
            maxWidth: 800,
            maxHeight: 500
          };

          function onEachFeature(feature: any, layer: any) {
            const tip = feature.tip;
            if (tip != null) {
              let tipText = '';
              if (tip.id != null) {
                let color = tip.color;
                if (color == null) {
                  color = 'black';
                }
                tipText += `<h3 style='color:${color}'>${tip.id}</h3>`;
              }

              const objInfo = tip.info;

              if (objInfo != null && Object.keys(objInfo).length > 0) {
                tipText += '<table>';
                for (const propName in objInfo) {
                  tipText += `<tr><td>${propName}</td><td>${objInfo[propName]}</td></tr>`;
                }
                tipText += '</table>';
              } else {
                tipText += '<i>No information present</i>';
              }

              layer.bindPopup(tipText, popupOption);

              if (typeof tip.name !== 'undefined') {
                layer.bindTooltip(tip.name, { permanent: true });
              }
            }
          }
          function polyStyle(feature: any) {
            let objColor = 'blue';
            if (feature.geometry.tip && feature.geometry.tip.color) {
              objColor = feature.geometry.tip.color;
            }
            return {
              weight: 2,
              color: objColor
            };
          }

          const vectorLayer = L.geoJSON([], {
            style: polyStyle,
            pointToLayer(feature, latlng) {
              return L.circleMarker(latlng, geojsonMarkerOptions);
            },
            onEachFeature
          });
          vectorLayer.addTo(geoMap);

          for (let i = 0; i < sourceValues.length; i++) {
            const geomValue = sourceValues[i];

            const polyTest = Geometry.parse(geomValue);
            const geoJSON = polyTest.toGeoJSON();

            geoJSON.tip = sourceTips[i];
            vectorLayer.addData(geoJSON);
          }

          const bounds = vectorLayer.getBounds();

          // if ('EPSG3857' == 'Simple') {
          //   const maxDimension = Math.max(bounds.getNorth() - bounds.getSouth(), bounds.getEast() - bounds.getWest());
          //   geoMap.setMinZoom(-5); // Small enough?
          //   if (maxDimension > 0) {
          //     geoMap.fitBounds(bounds);
          //   } else {
          //     geoMap.setView(bounds.getCenter(), geoMap.getZoom());
          //   }
          // } else {
          const geomBounds = undefined;
          geoMap.fitBounds(geomBounds === undefined ? bounds : geomBounds);
          geoMap.setZoom(Math.min(geoMap.getZoom(), 18), { animate: false });
          // }
        });
      }
    }
  }, [geoMap, osmList]);

  function showTools(toolsVisible: boolean) {
    const elements: any = document.getElementsByClassName('leaflet-control-container');
    const visibility = toolsVisible ? 'visible' : 'hidden';
    elements[0] && (elements[0].style.visibility = visibility);
  }

  function showLabels(visible: boolean) {
    const elements: any = document.getElementsByClassName('leaflet-tooltip');
    const visibility = visible ? 'visible' : 'hidden';
    for (let i = 0; i < elements.length; i++) {
      elements[i] && (elements[i].style.visibility = visibility);
    }
  }

  const getPlaceInfoByKeyword = useCallback(
    async (keyword: string) => {
      if (!keyword?.trim()) {
        message.warning('请输入地址');
        return;
      }
      setLoading(true);
      await getPlaceInfo(keyword)
        .then((res) => {
          if (res?.code === 0) {
            setOsmList(res.data?.data);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [renderMap]
  );

  useMount(() => {
    if (gisMap?.current && !geoMap) {
      initMap();

      setToolFlag(true);
      setLabelFlag(true);
    }
  });

  useEffect(() => {
    if (osmList) {
      renderMap();
    }
  }, [renderMap, osmList]);

  useEffect(() => {
    renderMap();
  }, [renderMap]);

  useEffect(() => {
    showTools(toolFlag);
    showLabels(labelFlag);
  }, [toolFlag, labelFlag]);

  return (
    <div className="gis">
      {loading && (
        <div className="gis-loading">
          <Spin />
          <div className="gis-loading-text">数据查询中...</div>
        </div>
      )}
      <div className="gis-search">
        <Input.Search placeholder="Search" onSearch={getPlaceInfoByKeyword} enterButton />
      </div>

      <div id="gis-map" ref={gisMap} />
      <div className="gis-operate">
        <Space>
          <Button type="primary" size="small" onClick={() => setToolFlag(!toolFlag)}>
            {toolFlag ? 'Show Tools' : 'Hide tools'}
          </Button>
          <Button type="primary" size="small" onClick={() => setLabelFlag(!labelFlag)}>
            {labelFlag ? 'Show Labels' : 'Hide Labels'}
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default OsmIndex;
