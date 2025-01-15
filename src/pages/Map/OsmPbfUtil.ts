import { readOsmData } from 'osm-pbf-parser';
import Pbf from 'pbf';

// 从某个地方获取你的PBF文件内容，比如通过fetch或File API

export async function loadPbfFile(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to load PBF file');
  }
  return await response.arrayBuffer();
}

export async function parseNodes(fileUrl: string) {
  const osmData: any = [];
  try {
    // 加载PBF文件
    const buffer = await loadPbfFile(fileUrl); // 替换为你的PBF文件路径

    // 解析PBF文件
    const entities = new Pbf(new Uint8Array(buffer));

    // 遍历所有实体并打印节点信息
    // for (const entity in entities) {
    //   if (entity.type === 'node') {
    //     console.log('Node ID:', entity.id);
    //     console.log('Longitude:', entity.lon);
    //     console.log('Latitude:', entity.lat);
    //     console.log('Tags:', entity.tags);
    //   }
    // }
  } catch (error) {
    console.error('Error parsing PBF:', error);
  }

  return osmData;
}
