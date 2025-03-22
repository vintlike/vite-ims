/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface LabelValue<T = string> {
  label: string;
  value: T;
  [key: string]: any;
}

declare interface Window {
  BMapGL: any;
  AMap: any;
}

declare module 'osm-pbf';
declare module 'osm-pbf-parser';
declare module 'tiny-inflate';
// declare module 'pbf';
declare module 'tiny-osmpbf';
// declare module 'tiny-osmpbf' {
//   import { Pbf } from 'pbf';

//   export default function parsePbf(buffer: ArrayBuffer): any;
// }
