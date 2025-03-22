import CommonForm from '@/components/CommonForm';
import { Checkbox, Form, Input, Radio } from 'antd';
import { useCallback, useState } from 'react';
import type { CommonFormProps } from '@/components/CommonForm';

import type { RadioChangeEvent } from 'antd';
import {
  CoordinateTypeDefault,
  CoordinateTypeList,
  GeometryTypeDefault,
  GeometryTypeList,
  MapTypeDefault,
  MapTypeList
} from '../adapter/MapConfig';
import type { IMapType } from '../adapter/MapConfig';

const { TextArea } = Input;

interface Props extends CommonFormProps {
  callback?: (values: any) => void;
}

interface MapFormProps extends Props {
  hideMapType?: boolean;
  hideCoordinateType?: boolean;
}

export const MapForm: React.FC<MapFormProps> = (props) => {
  const { callback, hideMapType, hideCoordinateType, ...rest } = props;

  const [mapType, setMapType] = useState<IMapType>(MapTypeDefault);

  /**
   * 切换地图类型
   */
  const handleSelectedMap = ({ target: { value } }: RadioChangeEvent) => {
    setMapType(value);
  };

  const onValuesChange = useCallback(
    (changedValues: any, allValues: any) => {
      callback && callback(allValues);
    },
    [callback]
  );

  return (
    <CommonForm
      {...rest}
      layout="horizontal"
      onValuesChange={onValuesChange}
      initialValues={{
        mapType: MapTypeDefault,
        coordinateType: CoordinateTypeDefault
      }}
      showOperate={false}
    >
      {!hideMapType && (
        <Form.Item label="地图类型" name="mapType">
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
            value={mapType}
            options={MapTypeList.map((item) => ({
              label: item.label,
              value: item.value
            }))}
            onChange={handleSelectedMap}
          />
        </Form.Item>
      )}
      {!hideCoordinateType && (
        <Form.Item label="原坐标系" name="coordinateType">
          <Radio.Group options={CoordinateTypeList} />
        </Form.Item>
      )}
    </CommonForm>
  );
};

export const MapFenceForm: React.FC<Props> = (props) => {
  const { callback, ...rest } = props;

  const onFinish = useCallback(
    (values: any) => {
      callback && callback(values);
    },
    [callback]
  );

  return (
    <CommonForm
      {...rest}
      layout="horizontal"
      onFinish={onFinish}
      submitText="解析"
      initialValues={{
        geoType: GeometryTypeDefault
      }}
    >
      <Form.Item label="经纬度" name="lnglat">
        <TextArea
          allowClear
          placeholder="请输入经纬度坐标数据"
          style={{ width: '100%', height: 100, resize: 'none' }}
        />
      </Form.Item>

      <Form.Item label="渲染方式" name="geoType">
        <Checkbox.Group
          options={GeometryTypeList.map((item) => ({
            label: item.label,
            value: item.value
          }))}
        />
      </Form.Item>
    </CommonForm>
  );
};

export const MapGeoForm: React.FC<Props> = (props) => {
  const { callback, ...rest } = props;

  const onFinish = useCallback(
    (values: any) => {
      callback && callback(values);
    },
    [callback]
  );

  return (
    <CommonForm {...rest} onFinish={onFinish} submitText="地址-&gt;经纬度">
      <Form.Item label="地&nbsp;&nbsp;&nbsp;&nbsp;址" name="address">
        <Input allowClear placeholder="请输入地址" />
      </Form.Item>
      <Form.Item label="经纬度" name="lnglat">
        <Input allowClear />
      </Form.Item>
    </CommonForm>
  );
};

export const MapRegeoForm: React.FC<Props> = (props) => {
  const { callback, ...rest } = props;

  const onFinish = useCallback(
    (values: any) => {
      callback && callback(values);
    },
    [callback]
  );

  return (
    <CommonForm {...rest} onFinish={onFinish} submitText="经纬度-&gt;地址">
      <Form.Item label="经纬度" name="lnglat">
        <Input allowClear placeholder="请输入经纬度坐标" />
      </Form.Item>
      <Form.Item label="地&nbsp;&nbsp;&nbsp;&nbsp;址" name="address">
        <Input allowClear />
      </Form.Item>
    </CommonForm>
  );
};

export const MapCoordinateForm: React.FC<Props> = (props) => {
  const { callback, ...rest } = props;

  const onFinish = useCallback(
    (values: any) => {
      callback && callback(values);
    },
    [callback]
  );

  return (
    <CommonForm {...rest} onValuesChange={onFinish} showOperate={false}>
      <Form.Item label="经纬度" name="lnglat">
        <Input.TextArea rows={5} allowClear placeholder="请输入经纬度坐标" />
      </Form.Item>
    </CommonForm>
  );
};
