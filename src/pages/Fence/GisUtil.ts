import { Buffer } from 'buffer/index'; // To use the node_modules version of the Buffer class
import L from 'leaflet';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import { Geometry } from 'wkx-ts';

/**
 * EPSG:3857（投影）：数据的可读性差和数值大存储比较占用内存。
 * EPSG:4326（地理）：使用此坐标系会导致页面变形。
 *
 *
 * 1、EPSG:4326（WGS84）
 * WGS84 是目前最流行的地理坐标系统。在国际上，每个坐标系统都会被分配一个 EPSG 代码，EPSG:4326 就是 WGS84 的代码。
 * GPS是基于WGS84的，所以通常我们得到的坐标数据都是WGS84的。一般我们在存储数据时，仍然按WGS84存储。
 *
 * 2、EPSG:3857（WGS84 Web Mercator）
 * 伪墨卡托投影，也被称为球体墨卡托，Web Mercator。它是基于墨卡托投影的，把 WGS84坐标系投影到正方形。
 * 我们前面已经知道 WGS84 是基于椭球体的，但是伪墨卡托投影把坐标投影到球体上，这导致两极的失真变大，但是却更容易计算。这也许是为什么被称为”伪“墨卡托吧。
 * 另外，伪墨卡托投影还切掉了南北85.051129°纬度以上的地区，以保证整个投影是正方形的。
 * 因为墨卡托投影等正形性的特点，在不同层级的图层上物体的形状保持不变，一个正方形可以不断被划分为更多更小的正方形以显示更清晰的细节。
 * 很明显，伪墨卡托坐标系是非常显示数据，但是不适合存储数据的，通常我们使用WGS84 存储数据，使用伪墨卡托显示数据。
 * Web Mercator 最早是由 Google 提出的，当前已经成为 Web Map 的事实标准。但是也许是由于上面”伪“的原因，最初 Web Mercator 被拒绝分配EPSG 代码。于是大家普遍使用 EPSG:900913（Google的数字变形） 的非官方代码来代表它。
 * 直到2008年，才被分配了EPSG:3785的代码，但在同一年没多久，又被弃用，重新分配了 EPSG:3857 的正式代码，使用至今。
 */

interface LnglatProps {
  lng: number;
  lat: number;
}
/**
 * EPSG:3857转换经纬度(EPSG:4326)
 * @param lnglat
 * @returns
 */
export function mercatorToLonlat(mercator: LnglatProps) {
  const coord = {
    lat: 0,
    lng: 0
  };
  const lat = (mercator.lat / 20037508.34) * 180;
  let lng = (mercator.lng / 20037508.34) * 180;
  lng = (180 / Math.PI) * (2 * Math.atan(Math.exp((lng * Math.PI) / 180)) - Math.PI / 2);
  coord.lat = lat;
  coord.lng = lng;

  return coord;
}

/**
 * 经纬度(EPSG:4326)转换EPSG:3857
 * @param lnglat
 * @returns
 */
export function lonlatToMercator(lnglat: LnglatProps) {
  const coord = {
    lat: 0,
    lng: 0
  };
  const earthRad = 6378137.0; //地球半径
  coord.lat = ((lnglat.lng * Math.PI) / 180) * earthRad;
  const param = (lnglat.lat * Math.PI) / 180;
  coord.lng = (earthRad / 2) * Math.log((1.0 + Math.sin(param)) / (1.0 - Math.sin(param)));

  return coord;
}

/**
 * 因为使用的 projection 是 "EPSG:4326" 类型，可以看到 center 中的数据格式 也是 "EPSG:4326" 的数值格式。
 * 所以没有用 fromLonLat() 方法 进行转换得到的图像信息
 * @returns
 */
export const setCenterMap = () => {
  const baseLayers = [
    new TileLayer({
      source: new OSM()
    })
  ];

  const centerMap = new Map({
    target: 'centerMap',
    layers: baseLayers,
    view: new View({
      projection: 'EPSG:3857',
      // center: fromLonLat([117.691603, 39.014074]),
      center: [0, 0],
      zoom: 11.5,
      maxZoom: 18,
      minZoom: 5
    })
  });

  return centerMap;
};

/**
 * 在实际开发中，因为map源数据大部分都是EPSG:4326的数据源格式的数据，但是使用EPSG:4326的坐标系地图会出现被压缩的感觉。
 * 所以我们都是采用 EPSG:3857的坐标系类型，把数据源转换位 EPSG:3857的数据源即可。
 * 但是这个EPSG:3857数据源不易读取和值占内存原因，所有结合两者的缺点，我们采用坐标转换，即 EPSG:4326转 EPSG:3857。
 * 所以请理解这句话：通常：数据存储在EPSG:4326中，显示在EPSG:3857中 如下所示：
 * @param map
 * @param attr
 * @param zoom
 */
// export function anmiteCenter(map: any, attr: LnglatProps, zoom: number) {
//   let pos = [attr.lng, attr.lat];
//   pos = ol.proj.transform(pos, 'EPSG:4326', 'EPSG:3857');
//   map.getView().animate({
//     center: pos,
//     zoom
//   });
// }

export function createPolygon(bufferStr: string) {
  const wkbBuffer = new Buffer(bufferStr, 'hex');
  const geometry = Geometry.parse(wkbBuffer);

  const { type = 'Polygon', coordinates = [] } = geometry.toGeoJSON();

  const polygonList = [];
  const polygonStart = 'POLYGON ((';
  const polygonEnd = '))';
  const polygonPoints = [];

  //将绘制对象点拆分转换
  for (let i = 0; i < coordinates.length; i++) {
    const item = coordinates[i];
    for (let j = 0; j < item.length; j++) {
      const [lat, lng] = item[j];

      // 存储在数据库中坐标EPSG:4326
      const point_old = L.latLng(lat, lng);

      // 将EPSG:4326转换成EPSG:3857的坐标
      const lonlat = mercatorToLonlat(point_old);

      // const point_new = L.CRS.EPSG3857.project(point_old);
      // const point = [point_new.y, point_new.x];
      // polygonPoints.push(point);

      polygonPoints.push(`${lonlat.lat} ${lonlat.lng}`);
    }
    const polygon = `${polygonStart}${polygonPoints.join(',')}${polygonEnd}`;

    polygonList.push(polygon);
  }

  return { polygonList, polygonPoints: polygonPoints.join(',') };
}

export function filterEmptyValue(obj: any) {
  Object.keys(obj).forEach((item) => {
    const key = obj[item];

    if (key === '' || key === null || key === undefined) {
      delete obj[item];
    }
  });

  return obj;
}
