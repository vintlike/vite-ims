import { Popup } from '@antv/l7';
import gcoord from 'gcoord';
import { CRSTypes, MapKeyConfig } from '../adapter/MapConfig';
import type { IFeatureCollectionProps, IFeatureItemProps, IGeometryType } from '../adapter/MapConfig';

/**
 * 坐标转换器
 */
export const lnglatConverter = (
  value: number[],
  sourceCoordinateType: CRSTypes = CRSTypes.WGS84,
  targetCoordinateType: CRSTypes = CRSTypes.GCJ02
) => {
  // 将WGS84坐标转换为GCJ02坐标
  const result = gcoord.transform(
    value as any, // 经纬度坐标
    gcoord[sourceCoordinateType], // 当前坐标系
    gcoord[targetCoordinateType] // 目标坐标系
  );

  return result;
};

/**
 * 解析提取坐标对的函数
 */
function extractPairs(str: string) {
  // 去除换行符、前后多余','、和两端的空格
  str = str
    .replace(/^\s*,+\s*|\s*,+\s*$/g, '')
    .replace(/[\r\n]/g, '')
    .trim();

  if (/polygon/gi.test('polygon')) {
    // 将字符串转换为小写，以实现不区分大小写的匹配
    const lowerCaseStr = str.toLowerCase();
    // 定义正则表达式来匹配 POLYGON 部分及括号内的坐标信息
    const regex = /polygon\s*\(\s*\((.*?)\)\s*\)/;
    const match = lowerCaseStr.match(regex);

    if (match) {
      // 提取括号内的坐标信息
      str = match[1];
    }
  }

  let pairs;
  // 匹配浮点数或整数的正则
  const numberPattern = /^\d+(\.\d+)?$/;

  function makePairs(pair: string, separator: string) {
    return pair.split(new RegExp(`\\s*${separator}\\s*`)).map((num) => {
      if (numberPattern.test(num)) {
        return parseFloat(num);
      }
      return NaN;
    });
  }

  if (/^\s*\(.*\)\s*$/g.test(str)) {
    // 处理 (1.2, 2.5), (2, 2.7), (1.3, 3) 形式
    pairs = str
      .replace(/^\s*\(|\)\s*$/g, '')
      .split(/\)\s*,\s*\(/)
      .map((pair) => {
        return makePairs(pair, ',');
      });
  } else if (/^\s*\[.*\]\s*$/g.test(str)) {
    // 处理 [1.2, 2.5], [2, 2.7], [1.3, 3] 形式
    pairs = str
      .replace(/^\s*\[|\]\s*$/g, '')
      .split(/\]\s*,\s*\[/)
      .map((pair) => {
        return makePairs(pair, ',');
      });
  } else if (/^(\d+(\.\d+)?\s*[\s+_]\s*\d+(\.\d+)?\s*)(,\s*\d+(\.\d+)?\s*[\s+_]\s*\d+(\.\d+)?\s*)*$/g.test(str)) {
    // 处理 1.2  2.5, 2  2.7, 1.3  3 或 1.2 _ 2.5, 2 _ 2.7, 1.3 _ 3 形式
    // 这里必须要先判断是否有'_'，再到空格
    const separator = str.includes('_') ? '_' : ' ';
    pairs = str.split(/\s*,\s*/).map((pair) => {
      return makePairs(pair, separator);
    });
  } else if (/^(\d+(\.\d+)?\s*,\s*\d+(\.\d+)?)(\s*[\s+_]\s*\d+(\.\d+)?\s*,\s*\d+(\.\d+)?)*$/g.test(str)) {
    // 处理 1.2,2.5_2,2.7_1.3,3 或 1.2, 2.5_2 ,2.7 _ 1.3,3 形式
    pairs = str.split(/\s*_\s*/).map((pair) => {
      return makePairs(pair, ',');
    });
  } else if (/^(\d+(\.\d*)?|\.\d+)\s*[,]\s*(\d+(\.\d*)?|\.\d+)\s*$/g.test(str)) {
    // 处理单个 1.2,2.5 形式
    pairs = str.split(/\s*,\s*/).map((pair) => {
      if (numberPattern.test(pair)) {
        return parseFloat(pair);
      }
      return NaN;
    });
    pairs = [pairs];
  } else {
    return [];
  }

  return pairs;
}

/**
 * 解析规则：
 * 先截取从开始到第一次出现逗号","时的字符坐标
 * 如果该坐标是xx_xx,xx_xx或xx xx,xx xx这种格式，则表示包含经度和纬度
 * 如果该坐标是xx这种格式，则表示只有经度
 */

export const lnglatParser = (value: string, sourceCoordinateType: CRSTypes, targetCoordinateType?: CRSTypes) => {
  if (!value) {
    return [];
  }

  const pairs = extractPairs(value);

  const val = pairs.map((item) => {
    const result = lnglatConverter(item, sourceCoordinateType, targetCoordinateType);
    return result;
  });

  console.log(`解析后的坐标：${targetCoordinateType}`, val);
  return val;
};

/**
 * 创建线图层或点图层数据
 */
export const getMapData = (features: IFeatureItemProps[], type: IGeometryType) => {
  const mapData: IFeatureCollectionProps = {
    type: 'FeatureCollection',
    features: features
      ?.filter((item: any) => item !== undefined)
      ?.map((item: any) => {
        return {
          type: 'Feature',
          properties: {},
          geometry: {
            type,
            coordinates: item
          }
        };
      })
  };

  return mapData;
};

/**
 * 显示当前坐标信息
 * @param scene
 * @param layer
 */
export const showLnglatInfo = (scene: any, layer: any) => {
  layer?.on('mousemove', (e: any) => {
    const popup = new Popup({
      offsets: [0, 0],
      closeButton: false
    })
      .setLnglat(e.lngLat)
      .setHTML(`<span>坐标：【${e.lngLat.lng}, ${e.lngLat.lat}】</span>`);
    scene?.addPopup(popup);
  });
};

export function loadScript(url: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('async', '');
    script.setAttribute('src', url);
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

/**
 * 加载地图脚本
 * @param code
 * @returns
 */
export function loadMapScript(code: string) {
  const { key, securityJsCode, version } = MapKeyConfig[code];
  return new Promise((resolve, reject) => {
    const instance = code === 'bmap' ? window.BMapGL : window.AMap;
    const urlMap: Record<string, string> = {
      amap: `https://webapi.amap.com/maps?v=${version}&key=${key}&callback=onCallback`,
      bmap: `https://api.map.baidu.com/api?v=${version}&type=webgl&ak=${key}&callback=onCallback`
    };
    if (typeof instance !== 'undefined') {
      resolve(instance);
      return;
    }
    (window as any).onCallback = function () {
      resolve(instance);
    };

    return loadScript(urlMap[code])
      .then(() => {
        if (code === 'amap') {
          (window as any)._AMapSecurityConfig = {
            // serviceHost:'您的代理服务器域名或地址/_AMapService',
            // 例如 ：serviceHost:'http://1.1.1.1:80/_AMapService',
            securityJsCode
          };
        }
        resolve(true);
      })
      .catch((err) => {
        console.log('加载地图脚本失败');
        reject(err);
      });
  });
}
