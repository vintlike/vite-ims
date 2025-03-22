export interface OsmBaseProps {
  osm_id: number;
  access?: string;
  addr_housename?: string;
  addr_housenumber?: string;
  addr_interpolation?: string;
  admin_level?: string;
  aerialway?: string;
  aeroway?: string;
  amenity?: string;
  area?: string;
  barrier?: string;
  bicycle?: string;
  brand?: string;
  bridge?: string;
  boundary?: string;
  building?: string;
  construction?: string;
  covered?: string;
  culvert?: string;
  cutting?: string;
  denomination?: string;
  disused?: string;
  embankment?: string;
  foot?: string;
  generator_source?: string;
  harbour?: string;
  highway?: string;
  historic?: string;
  horse?: string;
  intermittent?: string;
  junction?: string;
  landuse?: string;
  layer?: string;
  leisure?: string;
  lock?: string;
  man_made?: string;
  military?: string;
  motorcar?: string;
  name: string;
  natural?: string;
  office?: string;
  oneway?: string;
  operator?: string;
  place?: string;
  population?: string;
  power?: string;
  power_source?: string;
  public_transport?: string;
  railway?: string;
  ref?: string;
  religion?: string;
  route?: string;
  service?: string;
  shop?: string;
  sport?: string;
  surface?: string;
  toll?: string;
  tourism?: string;
  tower_type?: string;
  tracktype?: string;
  tunnel?: string;
  water?: string;
  waterway?: string;
  wetland?: string;
  width?: string;
  wood?: string;
  z_order?: number;
  way_area?: number;
  way: number;
}

export interface OsmPointProps extends OsmBaseProps {
  capital?: string;
  ele?: string;
}
export interface OsmLineProps extends OsmBaseProps {}
export interface OsmRoadsProps extends OsmBaseProps {}
export interface OsmPolygonProps extends OsmBaseProps {
  province_name?: string;
  city_name?: string;
  county_name?: string;
  district_name?: string;
  street_name?: string;
  full_address?: string;
}

export interface ReqOsmProps {
  /** 地区名称 */ keyword: string;
  /** 是否精确查询 */ accurate?: boolean;
}
