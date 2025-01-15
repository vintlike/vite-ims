import type Pbf from 'pbf';

export function Node() {}

Node.read = function (pbf: Pbf) {
  return {
    id: pbf.readVarint(),
    lon: pbf.readFloat(),
    lat: pbf.readFloat(),
    tags: {} // 这里可以根据实际的协议定义来解析 tags
  };
};
