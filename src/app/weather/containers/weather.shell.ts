import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { WeatherState } from '../state';
import * as WeatherchartAction from '../state/weather.actions';
import * as WeatherchartSelector from '../state';
import { WeatherChartComponent } from '../components/weather-chart.component';
import { Forecast, Wind } from '../models/forecast';
import { Locations, Place } from '../models/locations';
@Component({
  template: `


  <app-weatherchart #weatherchart
   [locationsArray]="locationsArray$ | async"
   [wind]="wind$ | async"
   (loadingStarted)="setLoadingStarted()"
   (locationSelected)="loadLocationForecastData($event)"
   (partialLocationsChanged)="loadPossibleLocations($event)"
  >
   </app-weatherchart>`
})
export class WeatherShellComponent implements OnInit {
  spinnerShow$: Observable<Boolean>;

  forecast$: Observable<Forecast>;
  locations$: Observable<Locations>;
  public wind$ = new Subject<Wind>();
  public locationsArray$ = new Subject<string[]>();
  @ViewChild('weatherchart') weatherchart: WeatherChartComponent;

  constructor(private store: Store<WeatherState>) {}
  ngOnInit(): void {
    this.locations$ = this.store.pipe(select(WeatherchartSelector.getLocations));
    this.forecast$ = this.store.pipe(select(WeatherchartSelector.getForecast));

    this.forecast$.subscribe(forecast => {
      if (forecast.query.results !== null) {
        const wind: Wind = forecast.query.results.channel[0].wind;
        wind.direction = this.getCardinal(Number(wind.direction));
        wind.speed = (Math.round(Number(wind.speed) / 3.6) * 100) / 100 + ' m/s';
        this.wind$.next(wind);
      }

      this.weatherchart.buildChart(forecast);
    });
    this.locations$.subscribe(locations => {
      const allLocations: string[] = [];
      if (locations !== null && locations.query.results !== null) {
        let title: string;

        if (locations.query.results.place.constructor === Array) {
          locations.query.results.place.map(place => {
            title = '';
            if (place.admin3) {
              if (title !== '') {
                title = title + ', ';
              }
              title = title + place.admin3.content;
            }
            if (place.admin2) {
              if (title !== '') {
                title = title + ', ';
              }
              title = title + place.admin2.content;
            }
            if (place.admin1) {
              if (title !== '') {
                title = title + ', ';
              }
              title = title + place.admin1.content;
            }
            if (place.country) {
              if (title !== '') {
                title = title + ', ';
              }
              title = title + place.country.code;
            }
            if (title === '') {
              title = title + place.name;
            }
            allLocations.push(title);
          });
        } else {
          title = '';
          const place: Place = locations.query.results.place;
          if (place.admin3) {
            if (title !== '') {
              title = title + ', ';
            }
            title = title + place.admin3.content;
          }
          if (place.admin2) {
            if (title !== '') {
              title = title + ', ';
            }
            title = title + place.admin2.content;
          }
          if (place.admin1) {
            if (title !== '') {
              title = title + ', ';
            }
            title = title + place.admin1.content;
          }
          if (place.country) {
            if (title !== '') {
              title = title + ', ';
            }
            title = title + place.country.code;
          }
          if (title === '') {
            title = title + place.name;
          }
          allLocations.push(title);
        }
      }
      this.locationsArray$.next(allLocations.splice(0, 3));
    });
  }
  getCardinal(angle) {
    const directions = 8;

    const degree = 360 / directions;
    angle = angle + degree / 2;

    if (angle >= 0 * degree && angle < 1 * degree) {
      return 'North';
    }
    if (angle >= 1 * degree && angle < 2 * degree) {
      return 'North East';
    }
    if (angle >= 2 * degree && angle < 3 * degree) {
      return 'East';
    }
    if (angle >= 3 * degree && angle < 4 * degree) {
      return 'South East';
    }
    if (angle >= 4 * degree && angle < 5 * degree) {
      return 'South';
    }
    if (angle >= 5 * degree && angle < 6 * degree) {
      return 'South West';
    }
    if (angle >= 6 * degree && angle < 7 * degree) {
      return 'West';
    }
    if (angle >= 7 * degree && angle < 8 * degree) {
      return 'North West';
    }
  }
  loadLocationForecastData(location: string): void {
    this.store.dispatch(new WeatherchartAction.LoadForecastAction(location));
  }
  loadPossibleLocations(partialLocation: string): void {
    this.store.dispatch(new WeatherchartAction.LoadLocationsAction(partialLocation));
  }
}
