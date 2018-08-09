import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `

  <div>
  <router-outlet></router-outlet>
</div>`
})
export class WeatherAppComponent {
  title = 'weatherchart-app';
}
