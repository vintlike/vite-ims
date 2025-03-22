import Message from '@/components/antds/Message';
import { CopyToClipboard } from '@/components/CopyToClipboard';
import { Form, Input, Space, Table } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import type { TableProps } from 'antd';
import { CoordinateTypeDefault, CoordinateTypeList, MapTypeDefault } from '../adapter/MapConfig';
import { MapLayout } from '../adapter/MapStyle';
import { MapCoordinateForm, MapForm } from '../components/MapForm';
import { lnglatParser } from '../utils/MapUtil';
import type { CRSTypes, IMapType } from '../adapter/MapConfig';

const coordinateDefault: Partial<Record<CRSTypes, string>> = {
  WGS84: '',
  GCJ02: '',
  BD09: ''
};

interface FormValues {
  lnglat: string | number[];
}

interface DataType {
  key: string;
  /** 坐标系类型 */ coordinateSystem: string;
  /** 坐标值 */ coordinateValue: string;
  /** 坐标系描述解释 */ description: string;
}

/**
 * 坐标系相互转换
 * @returns
 */
const CoordinateIndex = () => {
  const [convertValue, setConvertValue] = useState<Partial<Record<CRSTypes, string>>>(coordinateDefault);

  const [mapType, setMapType] = useState<IMapType>(MapTypeDefault);
  const [coordinateType, setCoordinateType] = useState(CoordinateTypeDefault);
  const [lnglat, setLnglat] = useState('');
  const [formInstance] = Form.useForm();
  const [coordinateForm] = Form.useForm<FormValues>();

  const printData = (data: number[][]) => {
    const result = data.map((item) => JSON.stringify(item)).join(',\n');
    return result;
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '坐标系',
      dataIndex: 'coordinateSystem',
      key: 'coordinateSystem',
      width: '16.66%'
    },
    {
      title: '坐标值',
      dataIndex: 'coordinateValue',
      key: 'coordinateValue',
      width: '50%',
      render: (text: any, record: any) => {
        const val = record.value === 'Original' ? text : convertValue[record.value as CRSTypes];
        return (
          <Space.Compact direction="horizontal" block style={{ width: '100%' }}>
            <Input.TextArea rows={5} value={val} />
            <CopyToClipboard text={val} useIcon />
          </Space.Compact>
        );
      }
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description'
    }
  ];

  // 根据坐标解析地址
  const convertCoordinate = useCallback(() => {
    const convertValueObj: Partial<Record<CRSTypes, string>> = {};

    Object.keys(coordinateDefault).forEach((key) => {
      convertValueObj[key as CRSTypes] = printData(lnglatParser(lnglat, coordinateType, key as CRSTypes));
    });

    setConvertValue(convertValueObj);
  }, [mapType, coordinateType, lnglat]);

  const onFinish = useCallback((values: any, key: string) => {
    if (key === 'mapForm') {
      const { mapType, coordinateType } = values;

      setMapType(mapType);
      setCoordinateType(coordinateType);
    } else if (key === 'coordinateForm') {
      const { lnglat = '' } = values;

      if (!lnglat?.trim()) {
        Message.error('请输入坐标');
        return;
      }

      setLnglat(lnglat);
    }
  }, []);

  useEffect(() => {
    convertCoordinate();
  }, [convertCoordinate, mapType, coordinateType, lnglat]);

  const dataSource: DataType[] = CoordinateTypeList.map((item, idx) => {
    return {
      key: `${idx}`,
      coordinateSystem: item.label,
      coordinateValue: convertValue?.[item.value as CRSTypes] || '',
      value: item.value,
      description: item.description
    };
  });

  return (
    <MapLayout>
      <div className="map-head">
        <MapForm hideMapType form={formInstance} callback={(values) => onFinish(values, 'mapForm')} />
      </div>
      <div className="map-form">
        <MapCoordinateForm form={coordinateForm} callback={(values) => onFinish(values, 'coordinateForm')} />
      </div>
      <div className="map-content">
        <Table bordered dataSource={dataSource} columns={columns} pagination={false} style={{ width: '100%' }} />
      </div>
    </MapLayout>
  );
};

export default CoordinateIndex;
