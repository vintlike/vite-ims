import { Buffer } from 'buffer';
import { OSMBlock } from 'osm-pbf'; // 注意：这里假设有一个合适的库提供OSMBlock定义
import Pbf from 'pbf';
import React from 'react';

const url: string = '/data/ningxia-latest.osm.pbf';
// 假设你已经有了一个包含PBF数据的ArrayBuffer
async function parseOsmPbf() {
  const coords: Array<[number, number]> = [];

  const response = await fetch(url);
  console.log(response);
  const arrayBuffer = await response.arrayBuffer();
  // const buffer = new Uint8Array(arrayBuffer);

  const buffer = arrayBuffer;
  const pbf = new Pbf(buffer);

  console.log(pbf);

  // // 使用 osm-pbf 库中的 OSMBlock 来读取数据块
  // const block = new OSMBlock(pbf);

  // // 这里你需要按照 OSM PBF 格式规范手动解析每个 PrimitiveBlock
  // // 并从中提取出节点的纬度和经度信息。
  // // 因为这涉及到较为复杂的逻辑，包括但不限于稀疏编码等，
  // // 所以我们在这里提供一个简化的示例，不完全符合实际情况。

  // // 解析所有原始块
  // for (const primitiveGroup of block.primitiveGroups) {
  //   // 遍历所有的节点
  //   for (const node of primitiveGroup.nodes) {
  //     // 节点的经纬度是以整数形式存储的，需要转换为浮点数
  //     const lat = node.lat / 1e7;
  //     const lon = node.lon / 1e7;

  //     coords.push([lat, lon]);
  //   }
  // }

  return coords;
}

// 在 React 组件中使用
const MapComponent: React.FC = () => {
  const [coordinates, setCoordinates] = React.useState<Array<[number, number]>>([]);

  React.useEffect(() => {
    // 加载 PBF 文件到 ArrayBuffer 中
    // 这里应该替换为实际加载文件的逻辑
    // const pbfBuffer = new ArrayBuffer(0); // 占位符

    // 解析 PBF 文件并更新状态
    const coords: any = parseOsmPbf();
    setCoordinates(coords);
  }, []);

  return (
    <div>
      {/* 渲染地图或坐标列表 */}
      <ul>
        {coordinates.map((coord, index: any) => (
          <li key={index as any}>
            Latitude: {coord[0]}, Longitude: {coord[1]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MapComponent;
