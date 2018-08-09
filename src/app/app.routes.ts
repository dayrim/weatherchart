import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { WeatherAppComponent } from './app-root';
import { PageNotFoundComponent } from './weather/components/not-found-component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'weather', pathMatch: 'full' },
  {
    path: '',
    component: WeatherAppComponent,
    children: [
      {
        path: 'weather',
        loadChildren: './weather/weather.module#WeatherModule'
      },
      { path: '', redirectTo: 'weather', pathMatch: 'full' }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
