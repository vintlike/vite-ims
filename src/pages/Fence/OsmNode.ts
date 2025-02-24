import type Pbf from 'pbf';

interface OsmNodeProps {
  id: number;
  lon: number;
  lat: number;
  tags: Record<number, number>;

  lonOrig?: number;
  latOrig?: number;
}

export function OsmNode() {}

function readTags(pbf: Pbf) {
  const tags: Record<number, number> = {};
  while (pbf.pos < pbf.length) {
    const key = pbf.readVarint();
    const value = pbf.readVarint();
    tags[key] = value;
  }
  return tags;
}

// 使用 protobuf 格式定义的 OSM 数据结构
OsmNode.read = function (pbf: Pbf) {
  const node: OsmNodeProps = {
    id: pbf.readVarint(),
    lon: pbf.readFloat(), // 转换为实际经度
    lat: pbf.readFloat(), // 转换为实际纬度

    tags: readTags(pbf)
    // lonOrig: pbf.readDouble(), // 转换为实际经度
    // latOrig: pbf.readDouble() // 转换为实际纬度
  };

  return node;
};
