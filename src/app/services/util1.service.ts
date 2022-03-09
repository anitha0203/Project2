import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Currentweather } from '../interfaces/currentweather.model';
import { CurrentWeatherapi } from '../interfaces/current-weatherapi.model';
import { Forecastweather } from '../interfaces/forecastweather.model';
import { ForecastWeatherapi } from '../interfaces/forecast-weatherapi.model';
import { environment } from 'src/environments/environment';
import { Dates } from '../interfaces/dates';

@Injectable({
  providedIn: 'root'
})
export class Util1Service {
  private cachedCurrentWeathers: Currentweather[] = [];

  constructor(private http: HttpClient) {}

  private getCachedCurrentWeather(zipCode: string): Currentweather | null {
      let cachedCurrentWeather: Currentweather = this.cachedCurrentWeathers.find(
          (cw) => cw.city.zipCode === zipCode,
      );
      if (
          cachedCurrentWeather &&
          Dates.differenceInMinutes(cachedCurrentWeather.cachedDatetime, new Date()) >
              environment.currentWeatherCacheInMinutes
      ) {
          cachedCurrentWeather = null;
          this.cachedCurrentWeathers = this.cachedCurrentWeathers.filter(
              (cw: Currentweather) => cw.city.zipCode !== zipCode,
          );
      }
      return cachedCurrentWeather;
  }

  public getCurrentWeather(zipCode: string): Observable<Currentweather> {
      let cachedCurrentWeather: Currentweather = this.getCachedCurrentWeather(zipCode);
      if (cachedCurrentWeather) {
          return of(cachedCurrentWeather);
      }

      const options = { params: new HttpParams().set('zip', zipCode + ',us') };
      return this.http
          .get<CurrentWeatherapi>(
              new URL('weather', environment.openweathermapApi.rootUrl).toString(),
              options,
          )
          .pipe(
              map(
                  (response: CurrentWeatherapi) =>
                      ({
                          city: {
                              zipCode: zipCode,
                              name: response.name,
                          },
                          weather: {
                              temperatureMin: response.main.temp_min,
                              temperatureMax: response.main.temp_max,
                              temperature: response.main.temp,
                              condition: response.weather[0]?.main,
                              datetime: new Date(response.dt * 1000),
                          },
                          cachedDatetime: new Date(),
                      } as Currentweather),
              ),
              tap((cw: Currentweather) => this.cachedCurrentWeathers.push(cw)),
          );
  }

  public getForecastWeather(zipCode: string): Observable<Forecastweather> {
      const options = {
          params: new HttpParams().set('zip', zipCode + ',us').set('cnt', environment.numberOfForecastedDays),
      };
      return this.http
          .get<ForecastWeatherapi>(
              new URL('forecast/daily', environment.openweathermapApi.rootUrl).toString(),
              options,
          )
          .pipe(
              map(
                  (response: ForecastWeatherapi) =>
                      ({
                          city: {
                              zipCode: zipCode,
                              name: response.city.name,
                          },
                          weathers: response.list.map((item) => {
                              return {
                                  temperatureMin: item.temp.min,
                                  temperatureMax: item.temp.max,
                                  temperature: item.temp.day,
                                  condition: item.weather[0]?.main,
                                  datetime: new Date(item.dt * 1000),
                              };
                          }),
                      } as Forecastweather),
              ),
          );
  }
}
