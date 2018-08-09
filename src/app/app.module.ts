import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { WeatherAppComponent } from './app-root';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { GlobalErrorHandlerService } from './weather/services/error.service';
import { PageNotFoundComponent } from './weather/components/not-found-component';

@NgModule({
  declarations: [PageNotFoundComponent, WeatherAppComponent],
  imports: [
    HttpClientModule,

    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({})
  ],
  providers: [
    GlobalErrorHandlerService,
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
  ],
  bootstrap: [WeatherAppComponent]
})
export class AppModule {}
