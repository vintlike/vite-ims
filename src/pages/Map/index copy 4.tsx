import axios from 'axios';
import * as osmpbf from 'osm-pbf-parser';
import Pbf from 'pbf';
import React, { useEffect, useState } from 'react';
const url = '/data/ningxia-latest.osm.pbf';

const OsmPbfParserComponent: React.FC = () => {
  const [osmData, setOsmData] = useState<any>(null);

  useEffect(() => {
    const fetchPbfData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/octet-stream'
          }
        });
        const arrayBuffer = await response.arrayBuffer();
        const pbfData = new Pbf(new Uint8Array(arrayBuffer));
        const osmData = osmpbf(pbfData);
        setOsmData(osmData);
      } catch (error) {
        console.error('Error fetching or parsing PBF file:', error);
      }
    };

    fetchPbfData();
  }, []);

  // useEffect(() => {
  //   const fetchPbfData = async () => {
  //     try {
  //       const response = await axios.get('/data/ningxia-latest.osm.pbf', {
  //         responseType: 'arraybuffer'
  //       });
  //       const pbfData = new Pbf(new Uint8Array(response.data));
  //       const osmData = osmpbf(pbfData);
  //       setOsmData(osmData);
  //     } catch (error) {
  //       console.error('Error fetching or parsing PBF file:', error);
  //     }
  //   };

  //   fetchPbfData();
  // }, []);

  return (
    <div>
      <h1>OSM PBF Parser</h1>
      {osmData && (
        <div>
          <h2>Nodes:</h2>
          <ul>
            {osmData.nodes.map((node: any, index: number) => (
              <li key={index}>{JSON.stringify(node)}</li>
            ))}
          </ul>
          <h2>Ways:</h2>
          <ul>
            {osmData.ways.map((way: any, index: number) => (
              <li key={index}>{JSON.stringify(way)}</li>
            ))}
          </ul>
          <h2>Relations:</h2>
          <ul>
            {osmData.relations.map((relation: any, index: number) => (
              <li key={index}>{JSON.stringify(relation)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OsmPbfParserComponent;
