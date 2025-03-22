import { BaiduMap, GaodeMap, Scene } from '@antv/l7';
import classNames from 'classnames';
import { isEmpty } from 'lodash-es';
import { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import SceneService from './lib/SceneService';
import { AMapLoader, BMapLoader, MapCommonConfig, MapKeyConfig } from './MapConfig';
import type { IMapType } from './MapConfig';

interface Props {
  mapType: IMapType;
  onRef: any;
  style?: React.CSSProperties;
  callback?: (lnglat: number[]) => void;
}

const SceneMap: React.FC<Props> = (props) => {
  const { mapType = 'amap', onRef, callback, style } = props;

  const mapRef = useRef<any>(null);
  const [sceneService, setSceneService] = useState<any>(null);
  const [lnglat, setLnglat] = useState<number[]>([]);

  /**
   * 加载地图实例
   */
  const loadMap = useCallback(async () => {
    let MapEntity: any = null;
    const { key, version, type } = MapKeyConfig[mapType] ?? {};

    if (mapType === 'amap') {
      // 本地配置 安全密钥（确保这行代码 比 AMapLoader.load 先执行即可，写在别处也行）
      (window as any)._AMapSecurityConfig = {
        securityJsCode: MapKeyConfig[mapType].securityJsCode
      };

      await AMapLoader({
        key, // 申请好的 Web 端开发者 Key，首次调用 load 时必填
        version, // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.AutoComplete', 'AMap.Geocoder'] // 需要使用的的插件列表，如比例尺'AMap.Scale'、'AMap.Geocoder'等
      }).then((AMap) => {
        MapEntity = AMap;
      });
    } else if (mapType === 'bmap') {
      await BMapLoader({
        ak: key,
        v: version,
        type
      }).then(() => {
        MapEntity = window?.BMapGL;
      });
    }
    const sceneService = new SceneService(mapType, mapRef.current, {}, MapEntity);

    setSceneService(sceneService);

    sceneService.scene.on('click', (e: any) => {
      // 获取鼠标当前点的坐标
      const { lng, lat } = e.lnglat || e.lngLat;
      setLnglat([lng, lat]);
    });
  }, [mapType]);

  useImperativeHandle(onRef, () => {
    return {
      sceneService,
      lnglat
    };
  });

  useEffect(() => {
    loadMap();
  }, []);

  useEffect(() => {
    if (!isEmpty(lnglat)) {
      callback && callback(lnglat);
    }
  }, [callback, lnglat]);

  return <div ref={mapRef} className={classNames(`map-container map-${mapType}`)} style={style} />;
};

export default SceneMap;
