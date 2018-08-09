import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { Forecast } from '../models/forecast';
import { Locations } from '../models/locations';

export interface WeatherState {
  forecast: Forecast;
  locations: Locations;
}

export const initialState: WeatherState = {
  forecast: {
    query: {
      count: 0,
      created: '',
      lang: '',
      results: {
        channel: [
          {
            title: '',
            wind: {
              chill: 0,
              direction: '',
              speed: ''
            },
            item: {
              forecast: {
                code: 0,
                date: '',
                day: '',
                high: 0,
                low: 0,
                text: ''
              }
            }
          }
        ]
      }
    }
  },
  locations: null
};

const getWeatherFeatureState: MemoizedSelector<object, WeatherState> = createFeatureSelector<
  WeatherState
>('weatherchart');

export const getLocations: MemoizedSelector<object, Locations> = createSelector(
  getWeatherFeatureState,
  state => state.locations
);
export const getForecast: MemoizedSelector<object, Forecast> = createSelector(
  getWeatherFeatureState,
  state => state.forecast
);
