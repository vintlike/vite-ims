import * as osmpbf from 'osm-pbf-parser';
import Pbf from 'pbf';

import React, { useEffect, useState } from 'react';
import { Node } from './osm-pbf';

const url = '/data/ningxia-latest.osm.pbf';

const OsmPbfParserComponent: React.FC = () => {
  const [osmData, setOsmData] = useState<any>(null);

  // 假设你使用 fetch 或其他方式获取 osm.pbf 文件的内容
  // 以下是一个示例使用 fetch 获取文件内容
  async function fetchOsmPbf() {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const pbf = new Pbf(arrayBuffer);

      const osmData = osmpbf(pbf);
      console.log('pbf===', osmData);
      while (pbf.pos < pbf.length) {
        const node = Node.read(pbf);
        console.log(node);
        // console.log(node.id);
        // console.log(node.lon);
        // console.log(node.lat);
        // console.log(node.tags);
      }
    } catch (error) {
      console.error('Error fetching or parsing PBF file:', error);
    }
  }

  fetchOsmPbf();

  // useEffect(() => {
  //   const fetchPbfData = async () => {
  //     try {
  //       const response = await fetch(url, {
  //         headers: {
  //           'Content-Type': 'application/octet-stream'
  //         }
  //       }).then((res) => {
  //         console.log('res===', res);
  //       });
  //       const arrayBuffer = await response.arrayBuffer();
  //       const pbfData = new Pbf(new Uint8Array(arrayBuffer));
  //       const osmData = osmpbf(pbfData);
  //       setOsmData(osmData);
  //     } catch (error) {
  //       console.error('Error fetching or parsing PBF file:', error);
  //     }
  //   };

  //   fetchPbfData();
  // }, []);

  // useEffect(() => {
  //   fs.readFile(url, (err, data) => {
  //     if (err) {
  //       console.error('Error reading file:', err);
  //       return;
  //     }
  //     try {
  //       const osmData = osmpbf(data);
  //       console.log(osmData);
  //       // 在这里可以对解析出来的 osmData 进行进一步的处理
  //       // 例如，你可以遍历 nodes、ways、relations 等
  //       osmData.nodes.forEach((node) => {
  //         console.log('Node:', node);
  //       });
  //       osmData.ways.forEach((way) => {
  //         console.log('Way:', way);
  //       });
  //       osmData.relations.forEach((relation) => {
  //         console.log('Relation:', relation);
  //       });
  //     } catch (error) {
  //       console.error('Error parsing OSM PBF file:', error);
  //     }
  //   });
  // }, []);

  return (
    <div>
      <h1>OSM PBF Parser</h1>
    </div>
  );
};

export default OsmPbfParserComponent;
