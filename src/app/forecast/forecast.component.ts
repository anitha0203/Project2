import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Forecastweather } from '../interfaces/forecastweather.model';
import { Util1Service } from '../services/util1.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  public forecastWeather$!: Observable<Forecastweather>;

  constructor(private weatherService: Util1Service, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.forecastWeather$ = this.route.paramMap.pipe(
          switchMap((params: ParamMap) => {
              let selectedZipCode: string = params.get('zipCode');
              return this.weatherService.getForecastWeather(selectedZipCode);
          }),
      );
  }

}
