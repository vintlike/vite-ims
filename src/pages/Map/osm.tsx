import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { parsePbf } from './pbfParser'; // 假设你有一个解析.pbf文件的函数
import 'leaflet/dist/leaflet.css';

const OsmMap: React.FC = () => {
  const [mapData, setMapData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/path/to/your/mapdata.pbf');
        const arrayBuffer = await response.arrayBuffer();
        const parsedData = parsePbf(arrayBuffer);
        setMapData(parsedData);
      } catch (error) {
        console.error('Error fetching or parsing map data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* 在这里你可以使用mapData来渲染地图上的其他元素 */}
    </MapContainer>
  );
};

export default OsmMap;
