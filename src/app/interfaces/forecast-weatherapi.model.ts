import { DailyForecastapi } from "./daily-forecastapi.model";

export interface ForecastWeatherapi {
    city: {
        id: number;
        name: string;
        coord: {
            lon: number;
            lat: number;
        };
        country: string;
        population: number;
        timezone: number;
    };
    cod: string;
    message: number;
    cnt: number;
    list: DailyForecastapi[];
}

