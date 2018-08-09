import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherChartComponent } from './components/weather-chart.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/weather.reducer';
import { WeatherShellComponent } from './containers/weather.shell';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from './state/weather.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatDividerModule,
  MatInputModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatDialogModule
} from '@angular/material';

export const COMPONENTS = [];
const weatherRoutes: Routes = [{ path: '', component: WeatherShellComponent }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    RouterModule.forChild(weatherRoutes),
    EffectsModule.forFeature([WeatherEffects]),
    StoreModule.forFeature('weatherchart', reducer)
  ],
  declarations: [WeatherChartComponent, WeatherShellComponent]
})
export class WeatherModule {}
