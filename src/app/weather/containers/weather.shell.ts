import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { WeatherState } from '../state';
import * as WeatherchartAction from '../state/weather.actions';
import * as WeatherchartSelector from '../state';
import { WeatherChartComponent } from '../components/weather-chart.component';
import { Forecast, Wind } from '../models/forecast';
import { Locations } from '../models/locations';
@Component({
  template: `

  <app-weatherchart #weatherchart
   [locationsArray]="locationsArray$ | async"
   [wind]="wind$ | async"
   (locationSelected)="loadLocationForecastData($event)"
   (partialLocationsChanged)="loadPossibleLocations($event)"
  >
   </app-weatherchart>`,
  styles: ['']
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
        const allDates: string[] = [];
        const allMaxTemp: number[] = [];
        const allMinTemp: number[] = [];
        let locationstring: string;

        wind.direction = this.getCardinal(Number(wind.direction));
        wind.speed = (Math.round(Number(wind.speed) / 3.6) * 100) / 100 + ' m/s';
        forecast.query.results.channel.forEach(channel => {
          const jsdate = new Date(channel.item.forecast.date);
          const datestring = jsdate.toLocaleTimeString('est', { day: 'numeric', month: 'short' });

          const day = datestring.replace('.', '').split(' ')[0];
          const month = datestring.replace('.', '').split(' ')[1];

          allDates.push(day + ' ' + month);
          if (channel.title) {
            locationstring = channel.title;
            locationstring = locationstring.substring(
              locationstring.indexOf('-') + 2,
              locationstring.length
            );
          }
        });

        forecast.query.results.channel.map(channel => {
          allMaxTemp.push(channel.item.forecast.high);
        });
        forecast.query.results.channel.map(channel => {
          allMinTemp.push(channel.item.forecast.low);
        });
        this.wind$.next(wind);
        this.weatherchart.buildChart(locationstring, allDates, allMaxTemp, allMinTemp);
      } else {
        this.weatherchart.drawChartError();
      }
    });
    this.locations$.subscribe(locations => {
      const allLocations: string[] = [];
      if (locations !== null && locations.query.results !== null) {
        if (locations.query.results.place.constructor === Array) {
          locations.query.results.place.map(place => {
            allLocations.push(this.getSuggestion(place));
          });
        } else {
          allLocations.push(this.getSuggestion(locations.query.results.place));
        }
      }
      this.locationsArray$.next(allLocations.splice(0, 3));
    });
  }
  getSuggestion(place: any): string {
    let title: string;
    title = '';
    Object.keys(place)
      .reverse()
      .forEach(key => {
        const value = place[key];
        if (key === 'admin3' && value !== null) {
          title = title + value.content + ', ';
        }
        if (key === 'admin2' && value !== null) {
          title = title + value.content + ', ';
        }
        if (key === 'admin1' && value !== null) {
          title = title + value.content + ', ';
        }
        if (key === 'country' && value !== null) {
          title = title + value.code + ', ';
        }
        if (key === 'name' && title === '') {
          title = value + ', ';
        }
      });
    return title.slice(0, -2);
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
