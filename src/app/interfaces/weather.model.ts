import { WeatherEnum } from "./weather.enum";

export interface Weather {
    condition: WeatherEnum;
    temperatureMax: number;
    temperatureMin: number;
    temperature: number;
    datetime: Date;
}
