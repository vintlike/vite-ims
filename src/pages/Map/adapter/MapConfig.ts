import { load as AMapLoader } from '@amap/amap-jsapi-loader';
import { loader as BMapLoader } from 'bmap-jsapi-loader';

export { AMapLoader, BMapLoader };

export type IGeoType = 'point' | 'line' | 'polygon';
export type IGeometryType = 'Point' | 'LineString' | 'Polygon';
export interface IFeatureItemProps {
  type: string;
  properties: {
    [key: string]: any;
  };
  geometry: {
    type: IGeometryType;
    coordinates: number[];
  };
}

export interface IFeatureCollectionProps {
  type: string;
  features: IFeatureItemProps[];
}

export interface IMapSceneProps {
  data: any[];
  type: IGeoType;
  size?: number;
  shape?: 'simple' | 'line' | 'fill' | 'wall';
  color?: string;
  style?: any;
}

export interface IMapHandles {}

export interface IMapCommonConfigProps {
  token?: string; // 根据不同地图服务加载不同的token
  center: [number, number];
  zoom?: number; // 初始化缩放等级，Mapbox （0-24） 高德 （2-19） 百度 （3-19）
  minZoom?: number;
  maxZoom?: number;
  rotation?: number; // 旋转角度
  pitch?: number; // 地图倾角
  style?: string;
}

export type IMapType = 'amap' | 'bmap';

export const MapTypeDefault: IMapType = 'amap';

export const MapTypeList: LabelValue<IMapType>[] = [
  {
    label: '高德地图',
    value: 'amap',
    key: '9115b18d7c8cf97033f0b4f1faa7a259',
    securityJsCode: '85b2147dae78f171665334625793a1b1',
    version: '2.0',
    style: 'normal'
  },
  {
    label: '百度地图',
    value: 'bmap',
    key: 'c3PVwY44PeR2imjoHfIN9p9GWBXRnJFm',
    securityJsCode: '',
    version: '1.0',
    style: 'dark',
    type: 'webgl'
  }
];

export const MapKeyConfig: any = Object.fromEntries(MapTypeList.map((item) => [item.value, item]));

export const MapCommonConfig: IMapCommonConfigProps = {
  // style: MapKeyConfig[MapTypeDefault].style, // 根据不同地图加载不同的样式
  // token: MapKeyConfig[MapTypeDefault].key, // 根据不同地图服务加载不同的token
  center: [116.39135328, 39.90750659],
  zoom: 5, // 初始化缩放等级，Mapbox （0-24） 高德 （2-19） 百度 （3-19）
  minZoom: 9,
  maxZoom: 19,
  rotation: 2, // 旋转角度
  pitch: 0 // 地图倾角
};

export const MapLayerConfig = {
  size: 2,
  pointSize: 8,
  pointShape: 'simple', // 简单点图层使用的 shape 参数固定为 simple
  wallSize: 20,
  shape: 'line',
  color: '#f00',
  style: {}
};

export const GeometryTypeMap: Record<string, IGeometryType> = {
  point: 'Point',
  line: 'LineString',
  // wall: 'LineString',
  polygon: 'Polygon'
};

export const GeometryTypeList: LabelValue<IGeoType>[] = [
  {
    label: '点图层',
    value: 'point'
  },
  {
    label: '线图层',
    value: 'line'
  },
  {
    label: '面图层',
    value: 'polygon'
  }
];
export const GeometryTypeDefault: IGeoType[] = ['line'];

export enum CRSTypes {
  WGS84 = 'WGS84',
  WGS1984 = 'WGS84',
  EPSG4326 = 'WGS84',
  GCJ02 = 'GCJ02',
  AMap = 'GCJ02',
  BD09 = 'BD09',
  BD09LL = 'BD09',
  Baidu = 'BD09',
  BMap = 'BD09',
  BD09MC = 'BD09MC',
  BD09Meter = 'BD09MC',
  EPSG3857 = 'EPSG3857',
  EPSG900913 = 'EPSG3857',
  EPSG102100 = 'EPSG3857',
  WebMercator = 'EPSG3857',
  WM = 'EPSG3857'
}

export const CoordinateTypeDefault = CRSTypes.WGS84;
export const CoordinateTypeList: LabelValue<CRSTypes>[] = [
  {
    label: 'WGS84(国际通用)',
    alias: 'WGS84',
    value: CRSTypes.WGS84,
    description: '地球坐标系，国际通用坐标系；Google海外地图使用。GeoJson、天地图（CGCS2000与WGS84坐标几乎一致）'
  },
  {
    label: 'GCJ02(高德地图)',
    alias: 'GCJ02',
    value: CRSTypes.GCJ02,
    description:
      '火星坐标系，WGS84坐标系加密后的坐标系；Google国内地图、高德地图、QQ地图、aliyun地图、mapabc地图和soso地图使用。'
  },
  {
    label: 'BD09(百度地图)',
    alias: 'BD09',
    value: CRSTypes.BD09,
    description: '百度坐标系，GCJ02坐标系加密后的坐标系。'
  }
];
