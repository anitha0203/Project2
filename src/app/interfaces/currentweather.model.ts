import { City } from "./city.model";
import { Weather } from "./weather.model";

export interface Currentweather {
    city: City;
    weather: Weather;
    cachedDatetime: Date;
}