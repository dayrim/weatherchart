import * as WeatherAction from './weather.actions';
import { WeatherState, initialState } from '.';

export function reducer(state = initialState, action: WeatherAction.Action): WeatherState {
  switch (action.type) {
    case WeatherAction.WeatherchartActionTypes.LoadForecastSuccess: {
      return {
        ...state,
        forecast: action.payload
      };
    }
    case WeatherAction.WeatherchartActionTypes.LoadLocationsSuccess: {
      return {
        ...state,
        locations: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
