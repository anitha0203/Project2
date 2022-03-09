import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WeatherEnum } from './interfaces/weather.enum';

@Pipe({
  name: 'iconurl'
})
export class IconurlPipe implements PipeTransform {

  transform(condition: WeatherEnum): string {
    let url = environment.iconsRootUrl;
    switch (condition) {
        case WeatherEnum.Clear:
            url += 'sun.png';
            break;
        case WeatherEnum.Rain:
        case WeatherEnum.Drizzle:
        case WeatherEnum.Thunderstorm:
            url += 'rain.png';
            break;
        case WeatherEnum.Snow:
            url += 'snow.png';
            break;
        default:
            url += 'clouds.png';
            break;
    }
    return url;
  }

}
