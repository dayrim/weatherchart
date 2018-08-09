import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Forecast } from '../models/forecast';
import { Locations } from '../models/locations';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherDataByLocation(location: string): Observable<Forecast> {
    return this.http
      .get<Forecast>('/api/forecast/' + encodeURI(location))
      .pipe(catchError(err => throwError(err)));
  }
  getPossibleLocations(partialLocation: string): Observable<Locations> {
    return this.http
      .get<Locations>('/api/locations/' + encodeURI(partialLocation))
      .pipe(catchError(err => throwError(err)));
  }
}
