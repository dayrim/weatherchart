import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterContentInit
} from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { Forecast, Wind } from '../models/forecast';
import { Chart } from 'chart.js';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-weatherchart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [style({ opacity: 0 }), animate(500, style({ opacity: 1 }))]),
      transition(':leave', [animate(500, style({ opacity: 0 }))])
    ])
  ]
})
export class WeatherChartComponent implements AfterContentInit {
  @Input() spinnerShow: boolean;
  @Input() forecast: Forecast;
  @Input() wind: Wind;
  @Input() locationsArray: string[];
  @Output() locationSelected = new EventEmitter<String>();
  @Output() partialLocationsChanged = new EventEmitter<String>();
  @ViewChild('locationInput') locationInput: ElementRef;
  @ViewChild('chartCanvas') chartCanvas: ElementRef;
  private chart: Chart;
  private myControl = new FormControl();
  constructor() {}

  ngAfterContentInit(): void {
    Chart.defaults.global.elements.point.radius = 5;
    this.locationSelected.emit(this.locationInput.nativeElement.value);
  }
  queryPartialLocation(partialLocation: string): void {
    this.partialLocationsChanged.emit(partialLocation);
  }
  querySelectedLocation(location: string): void {
    this.locationSelected.emit(location);
  }

  buildChart(forecast: Forecast): void {
    if (forecast.query.results === null) {
      if (this.chart) {
        this.chart.destroy();
      }
      const twodContext = this.chartCanvas.nativeElement.getContext('2d');

      twodContext.font = '25px Arial';
      twodContext.textAlign = 'center';

      twodContext.fillText('No data for location', 150, 120);

      return;
    } else if (forecast.query.count === 0) {
      return;
    }
    if (!this.chart || this.chart.canvas === null) {
      this.chart = new Chart(this.chartCanvas.nativeElement, {
        type: 'line',

        data: {
          labels: [],
          datasets: [
            {
              label: 'Highest',
              data: [],
              borderColor: '#800000',
              fill: false
            },
            {
              label: 'Lowest',
              data: [],
              borderColor: '#0000A0',
              fill: false
            }
          ],
          borderWidth: 1
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          tooltips: {
            mode: 'index',
            intersect: false
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  suggestedMin: 1,
                  suggestedMax: 10
                },
                display: true
              }
            ],
            yAxes: [
              {
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: 40
                },
                display: true
              }
            ]
          }
        }
      });
      this.chart.resize();
    }
    this.forecast = forecast;

    const allDates: string[] = [];
    const allMaxTemp: number[] = [];
    const allMinTemp: number[] = [];
    forecast.query.results.channel.forEach(channel => {
      const jsdate = new Date(channel.item.forecast.date);
      let datestring = jsdate.toLocaleTimeString('est', { day: 'numeric', month: 'short' });
      datestring = datestring.substring(0, datestring.indexOf(','));

      allDates.push(datestring);

      if (channel.title) {
        let locationstring = channel.title;
        locationstring = locationstring.substring(
          locationstring.indexOf('-') + 2,
          locationstring.length
        );
        this.locationInput.nativeElement.value = locationstring;
      }
    });

    forecast.query.results.channel.map(channel => {
      allMaxTemp.push(channel.item.forecast.high);
    });
    forecast.query.results.channel.map(channel => {
      allMinTemp.push(channel.item.forecast.low);
    });
    if (this.chart) {
      this.chart.data.labels = allDates;
      this.chart.data.datasets[0].data = allMaxTemp;
      this.chart.data.datasets[1].data = allMinTemp;
      this.chart.update();
    }
  }
}
