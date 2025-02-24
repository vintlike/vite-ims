import React, { useState } from 'react';
import { parseNodes } from './OsmPbfUtil';

const url = '/data/ningxia-latest.osm.pbf';

const OsmPbfParserComponent: React.FC = () => {
  const [osmData, setOsmData] = useState<any>(null);

  parseNodes(url);

  return (
    <div>
      <h1>OSM PBF Parser</h1>
    </div>
  );
};

export default OsmPbfParserComponent;
