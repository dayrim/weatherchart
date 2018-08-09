import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { NewsService } from '../services/weather.service';
import * as WeatherchartAction from './weather.actions';
import { mergeMap, map, switchMap } from 'rxjs/operators';

import { Observable } from 'rxjs';

@Injectable()
export class WeatherEffects {
  constructor(private actions$: Actions, private newsService: NewsService) {}

  @Effect()
  loadForecast$: Observable<WeatherchartAction.Action> = this.actions$.pipe(
    ofType(WeatherchartAction.WeatherchartActionTypes.LoadForecast),
    map((action: WeatherchartAction.LoadForecastAction) => action.payload),
    mergeMap((location: string) =>
      this.newsService
        .getWeatherDataByLocation(location)
        .pipe(map(forecast => new WeatherchartAction.LoadForecastSuccessAction(forecast)))
    )
  );
  @Effect()
  loadLocations$: Observable<WeatherchartAction.Action> = this.actions$.pipe(
    ofType(WeatherchartAction.WeatherchartActionTypes.LoadLocations),
    map((action: WeatherchartAction.LoadLocationsAction) => action.payload),
    switchMap((partialLocation: string) =>
      this.newsService
        .getPossibleLocations(partialLocation)
        .pipe(map(location => new WeatherchartAction.LoadLocationsSuccessAction(location)))
    )
  );
}
