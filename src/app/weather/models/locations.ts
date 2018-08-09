export interface Locations {
  query: LocationsQuery;
}
export interface LocationsQuery {
  count: number;
  created: string;
  lang: string;
  results: LQueryResults;
}
export interface LQueryResults {
  place?: Place[];
}
export interface Place {
  lang: string;
  xmlns: string;
  yahoo: string;
  uri: string;
  woeid: number;
  placeTypeName: PlaceTypeName;
  name: string;
  country: Country;
  admin1: Admin1;
  admin2: Admin2;
  admin3: Admin3;
  locality1: Locality1;
  locality2: Locality2;
  postal: Postal;
  centroid: Centroid;
  boundingBox: BoundingBox;
  areaRank: number;
  popRank: number;
  timezone: Timezone;
}
export interface PlaceTypeName {
  code: number;
  content: string;
}
export interface Country {
  code: string;
  type: string;
  woeid: number;
  content: string;
}
export interface Admin1 {
  code: string;
  type: string;
  woeid: number;
  content: string;
}
export interface Admin2 {
  code: string;
  type: string;
  woeid: number;
  content: string;
}
export interface Admin3 {
  code: string;
  type: string;
  woeid: number;
  content: string;
}
export interface Locality1 {
  type: string;
  woeid: number;
  content: string;
}
export interface Locality2 {
  type: string;
  woeid: number;
  content: string;
}
export interface Postal {
  type: string;
  woeid: number;
  content: string;
}
export interface Centroid {
  latitude: number;
  longitude: number;
}
export interface BoundingBox {
  southWest: SouthWest;
  northEast: NorthEast;
}
export interface SouthWest {
  latitude: number;
  longitude: number;
}
export interface NorthEast {
  latitude: number;
  longitude: number;
}
export interface Timezone {
  type: string;
  woeid: number;
  content: string;
}
