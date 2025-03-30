import Message from '@/components/antds/Message';
import { Form } from 'antd';
import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import { type IMapType, MapTypeDefault, MapTypeList } from '../../adapter/MapConfig';
import { MapLayout } from '../../adapter/MapStyle';
import SceneMap from '../../adapter/SceneMap';
import { MapForm, MapGeoForm } from '../../components/MapForm';

interface FormValues {
  lnglat: string | number[];
  address: string;
}

interface Props {
  style?: React.CSSProperties;
}

/**
 * 地址->坐标
 * @param props
 * @returns
 */
export default function Geocoding(props: Props) {
  const { style } = props;

  // 创建一个ref对象
  const mapRefs = useRef<any>({});
  const [mapType, setMapType] = useState<IMapType>(MapTypeDefault);
  const [address, setAddress] = useState('');

  const [formInstance] = Form.useForm();
  const [geoCodeForm] = Form.useForm<FormValues>();

  const onReset = useCallback(() => {
    Object.keys(mapRefs.current).forEach((key) => {
      if (mapRefs.current[key]) {
        const currMapRef = mapRefs.current[key];
        currMapRef?.sceneService?.resetLayer();
      }
    });
  }, []);

  // 根据坐标解析地址
  const parseLnglat = useCallback(() => {
    const currMapRef = mapRefs.current?.[mapType];
    currMapRef?.sceneService?.resetLayer();

    currMapRef?.sceneService?.geoCode(address, (lnglat: number[]) => {
      geoCodeForm.setFieldsValue({
        lnglat
      });
    });
  }, [mapType, address]);

  const onFinish = useCallback((values: any, key: string) => {
    if (key === 'mapForm') {
      const { mapType } = values;

      setMapType(mapType);
    } else if (key === 'geoForm') {
      const { address } = values;

      if (!address?.trim()) {
        Message.error('请输入地址');
        return;
      }

      setAddress(address);
    }
  }, []);

  const onMapCallback = useCallback(
    (lnglat: number[]) => {
      geoCodeForm.setFieldsValue({
        lnglat: lnglat.join(','),
        address: ''
      });

      const currMapRef = mapRefs.current?.[mapType];
      currMapRef?.sceneService?.regeoCode(lnglat, (value: string) => {
        geoCodeForm.setFieldsValue({
          address: value
        });
      });
    },
    [formInstance]
  );

  useEffect(() => {
    parseLnglat();
  }, [parseLnglat, mapType, address]);

  return (
    <MapLayout style={style}>
      <div className="map-head">
        <MapForm form={formInstance} hideCoordinateType callback={(values) => onFinish(values, 'mapForm')} />
      </div>
      <div className="map-form">
        <MapGeoForm form={geoCodeForm} callback={(values) => onFinish(values, 'geoForm')} onReset={onReset} />
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
                  callback={onMapCallback}
                />
              </div>
            );
          })}
        </div>
      </div>
    </MapLayout>
  );
}
