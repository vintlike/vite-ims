import Message from '@/components/antds/Message';
import { Form } from 'antd';
import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CoordinateTypeDefault, CRSTypes, type IMapType, MapTypeDefault, MapTypeList } from '../../adapter/MapConfig';
import { MapLayout } from '../../adapter/MapStyle';
import SceneMap from '../../adapter/SceneMap';
import { MapForm, MapRegeoForm } from '../../components/MapForm';
import { lnglatParser } from '../../utils/MapUtil';

interface FormValues {
  lnglat: string | number[];
  address: string;
}

interface Props {
  style?: React.CSSProperties;
}

export default function ReGeocoding(props: Props) {
  const { style } = props;

  // 创建一个ref对象
  const mapRefs = useRef<any>({});
  const [mapType, setMapType] = useState<IMapType>(MapTypeDefault);
  const [coordinateType, setCoordinateType] = useState(CoordinateTypeDefault);
  const [lnglat, setLnglat] = useState('');

  const [formInstance] = Form.useForm();
  const [regeoCodeForm] = Form.useForm<FormValues>();

  const onReset = useCallback(() => {
    Object.keys(mapRefs.current).forEach((key) => {
      if (mapRefs.current[key]) {
        const currMapRef = mapRefs.current[key];
        currMapRef?.sceneService?.resetLayer();
      }
    });
  }, []);

  // 根据坐标解析地址
  const parseAddress = useCallback(() => {
    const currMapRef = mapRefs.current?.[mapType];
    currMapRef?.sceneService?.resetLayer();

    const targetCoordinateType = mapType === 'bmap' ? CRSTypes.BD09 : CRSTypes.GCJ02;

    const lnglatData = lnglatParser(lnglat, coordinateType, targetCoordinateType)[0] ?? [];

    currMapRef?.sceneService?.regeoCode(lnglatData, (address: string) => {
      regeoCodeForm.setFieldsValue({
        address
      });
    });
  }, [mapType, coordinateType, lnglat]);

  const onFinish = useCallback((values: any, key: string) => {
    if (key === 'mapForm') {
      const { mapType, coordinateType } = values;

      setMapType(mapType);
      setCoordinateType(coordinateType);
    } else if (key === 'regeoForm') {
      const { lnglat = '' } = values;

      if (!lnglat?.trim()) {
        Message.error('请输入坐标');
        return;
      }

      setLnglat(lnglat);
    }
  }, []);

  const onMapCallback = useCallback(
    (lnglat: number[]) => {
      regeoCodeForm.setFieldsValue({
        lnglat: lnglat.join(','),
        address: ''
      });

      const currMapRef = mapRefs.current?.[mapType];
      currMapRef?.sceneService?.regeoCode(lnglat, (value: string) => {
        regeoCodeForm.setFieldsValue({
          address: value
        });
      });
    },
    [mapType, regeoCodeForm]
  );

  useEffect(() => {
    parseAddress();
  }, [parseAddress, mapType, coordinateType, lnglat]);

  return (
    <MapLayout style={style}>
      <div className="map-head">
        <MapForm form={formInstance} callback={(values) => onFinish(values, 'mapForm')} />
      </div>
      <div className="map-form">
        <MapRegeoForm form={regeoCodeForm} callback={(values) => onFinish(values, 'regeoForm')} onReset={onReset} />
      </div>
      <div className="map-content">
        <div className="map-list">
          {MapTypeList.map((item, idx) => {
            return (
              <div key={idx} className={classNames('map-list-item', { 'map-list-item-half': MapTypeList.length > 1 })}>
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
