import { Forecast } from '../models/forecast';
import { Locations } from '../models/locations';

export enum WeatherchartActionTypes {
  LoadForecast = '[FORECAST] LOAD_FORECAST',
  LoadForecastSuccess = '[FORECAST] LOAD_FORECAST_SUCCESS',
  LoadLocations = '[LOCATIONS] LOAD_LOCATIONS',
  LoadLocationsSuccess = '[LOCATIONS] LOAD_LOCATIONS_SUCCESS'
}
export class LoadLocationsAction {
  readonly type = WeatherchartActionTypes.LoadLocations;
  constructor(public payload: string) {}
}
export class LoadLocationsSuccessAction {
  readonly type = WeatherchartActionTypes.LoadLocationsSuccess;
  constructor(public payload: Locations) {}
}

export class LoadForecastAction {
  readonly type = WeatherchartActionTypes.LoadForecast;
  constructor(public payload: string) {}
}
export class LoadForecastSuccessAction {
  readonly type = WeatherchartActionTypes.LoadForecastSuccess;
  constructor(public payload: Forecast) {}
}

export type Action =
  | LoadLocationsAction
  | LoadLocationsSuccessAction
  | LoadForecastAction
  | LoadForecastSuccessAction;
