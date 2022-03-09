import { Weatherapi } from "./weatherapi.model";

export interface DailyForecastapi {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: {
        day: number;
        min: number;
        max: number;
        night: number;
        eve: number;
        morn: number;
    };
    feels_like: {
        day: number;
        night: number;
        eve: number;
        morn: number;
    };
    pressure: number;
    humidity: number;
    weather: Weatherapi[];
    speed: number;
    deg: number;
    gust: number;
    clouds: number;
    pop: number;
}
