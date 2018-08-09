export interface Forecast {
  query: ForecastQuery;
}

export interface ForecastQuery {
  count: number;
  created: string;
  lang: string;
  results: QueryResults;
}
export interface QueryResults {
  channel: Channel[];
}
export interface Channel {
  title: string;
  wind: Wind;
  item: Item;
}
export interface Wind {
  chill: number;
  direction: string;
  speed: string;
}
export interface Item {
  forecast: TempForecast;
}
export interface TempForecast {
  code: number;
  date: string;
  day: string;
  high: number;
  low: number;
  text: string;
}
