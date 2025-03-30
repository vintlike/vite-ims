import Message from '@/components/antds/Message';
import { Form } from 'antd';
import classNames from 'classnames';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CoordinateTypeDefault,
  CRSTypes,
  GeometryTypeDefault,
  MapTypeDefault,
  MapTypeList
} from '../../adapter/MapConfig';
import { MapLayout } from '../../adapter/MapStyle';
import SceneMap from '../../adapter/SceneMap';
import { MapFenceForm, MapForm } from '../../components/MapForm';
import { lnglatParser } from '../../utils/MapUtil';
import type { IGeoType, IMapSceneProps, IMapType } from '../../adapter/MapConfig';

interface FormValues {
  lnglat: string | number[];
  getType: IGeoType[];
}

interface Props {
  style?: React.CSSProperties;
}

export default function GeoFence(props: Props) {
  const { style } = props;

  // 创建一个ref对象
  const mapRefs = useRef<any>({});
  const [mapType, setMapType] = useState<IMapType>(MapTypeDefault);
  const [coordinateType, setCoordinateType] = useState(CoordinateTypeDefault);
  const [lnglat, setLnglat] = useState('');
  const [geoType, setGeoType] = useState<IGeoType[]>(GeometryTypeDefault);

  const [formInstance] = Form.useForm();
  const [fenceForm] = Form.useForm<FormValues>();

  const onReset = useCallback(() => {
    Object.keys(mapRefs.current).forEach((key) => {
      if (mapRefs.current[key]) {
        const currMapRef = mapRefs.current[key];
        currMapRef?.sceneService?.resetLayer();
      }
    });
  }, []);

  const parsePolygon = useCallback(() => {
    const currMapRef = mapRefs.current?.[mapType];
    currMapRef?.sceneService?.resetLayer();

    const targetCoordinateType = mapType === 'bmap' ? CRSTypes.BD09 : CRSTypes.GCJ02;
    const data: IMapSceneProps[] = [];

    geoType.includes('point') &&
      data.push({
        data: [lnglatParser(lnglat, coordinateType, targetCoordinateType)],
        type: 'point',
        color: '#415fff'
      });

    geoType.includes('line') &&
      data.push({
        data: [lnglatParser(lnglat, coordinateType, targetCoordinateType)],
        type: 'line'
      });

    geoType.includes('polygon') &&
      data.push({
        data: [lnglatParser(lnglat, coordinateType, targetCoordinateType)],
        type: 'line',
        color: '#0DCCFF',
        size: 40,
        shape: 'wall',
        style: {
          opacity: 1,
          sourceColor: '#0DCCFF',
          targetColor: 'rgba(255,255,255, 0)'
        }
      });

    data?.forEach((item: any) => {
      currMapRef?.sceneService?.drawLayer(item);
    });
  }, [mapType, coordinateType, lnglat, geoType]);

  const onFinish = useCallback((values: any, key: string) => {
    if (key === 'mapForm') {
      const { mapType, coordinateType } = values;

      setMapType(mapType);
      setCoordinateType(coordinateType);
    } else if (key === 'fenceForm') {
      const { lnglat, geoType } = values;

      if (!lnglat?.trim()) {
        Message.error('请输入坐标');
        return;
      }

      if (geoType.length === 0) {
        Message.error('请选择渲染方式');
        return;
      }

      setLnglat(lnglat);
      setGeoType(geoType);
    }
  }, []);

  // const onFinish = useCallback(
  //   (values: any, key: string) => {
  //     const mapRef = (mapType.includes('amap') ? amapRef : bmapRef).current;
  //     mapRef?.sceneService?.resetLayer();

  //     const targetCoordinateType = mapType === 'bmap' ? CRSTypes.BD09 : CRSTypes.GCJ02;

  //     if (key === 'fenceForm') {
  //       const { lnglat, geoType } = values;
  //       const data: IMapSceneProps[] = [];
  //       geoType.includes('point') &&
  //         data.push({
  //           data: [lnglatParser(lnglat, coordinateType, targetCoordinateType)],
  //           type: 'point',
  //           color: '#415fff'
  //         });

  //       geoType.includes('point') &&
  //         data.push({
  //           data: [lnglatParser(lnglat, coordinateType, targetCoordinateType)],
  //           type: 'line'
  //         });

  //       geoType.includes('polygon') &&
  //         data.push({
  //           data: [lnglatParser(lnglat, coordinateType, targetCoordinateType)],
  //           type: 'line',
  //           color: '#0DCCFF',
  //           size: 40,
  //           shape: 'wall',
  //           style: {
  //             opacity: 1,
  //             sourceColor: '#0DCCFF',
  //             targetColor: 'rgba(255,255,255, 0)'
  //           }
  //         });

  //       data?.forEach((item: any) => {
  //         mapRef.sceneService.drawLayer(item);
  //       });
  //     } else if (key === 'geoForm') {
  //       const { address } = values;

  //       mapRef.sceneService.geoCode(address, (lnglat: number[]) => {
  //         geoCodeForm.setFieldsValue({
  //           lnglat
  //         });
  //       });
  //     }
  //   },
  //   [geoCodeForm, regeoCodeForm, coordinateType]
  // );

  useEffect(() => {
    parsePolygon();
  }, [parsePolygon, mapType, coordinateType, lnglat, geoType]);

  return (
    <MapLayout style={style}>
      <div className="map-head">
        <MapForm form={formInstance} callback={(values) => onFinish(values, 'mapForm')} />
      </div>
      <div className="map-form">
        <MapFenceForm form={fenceForm} callback={(values) => onFinish(values, 'fenceForm')} onReset={onReset} />
      </div>
      <div className="map-content">
        <div className="map-list">
          {MapTypeList.map((item) => {
            return (
              <div
                key={item.value}
                className={classNames('map-list-item', { 'map-list-item-half': MapTypeList.length > 1 })}
              >
                <SceneMap
                  key={item.value}
                  mapType={item.value}
                  onRef={(el: any) => (mapRefs.current[item.value] = el)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </MapLayout>
  );
}
