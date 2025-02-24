import Pbf from 'pbf';

import { OsmNode } from './OsmNode';

export async function loadPbfFile(fileUrl: string): Promise<ArrayBuffer> {
  const response = await fetch(fileUrl);

  if (!response.ok) {
    throw new Error('Failed to load PBF file');
  }

  return await response.arrayBuffer();
}

export async function parsePbfNodes(fileUrl: string) {
  const osmData: any = [];

  try {
    // 加载PBF文件
    const response = await fetch(fileUrl);
    const arrayBuffer = await response.arrayBuffer(); // 替换为你的PBF文件路径
    // const arrayBuffer = await loadPbfFile(fileUrl); // 替换为你的PBF文件路径
    const buffer = new Uint8Array(arrayBuffer);

    // 解析PBF文件
    const pbfData = new Pbf(buffer);

    // 遍历所有实体并打印节点信息
    while (pbfData.pos < pbfData.length) {
      const nodeData = OsmNode.read(pbfData);
      // const { id, lon, lat, tags } = nodeData;

      osmData.push(nodeData);
    }
  } catch (error) {
    console.error('Error parsing PBF:', error);
  }

  return osmData;
}
