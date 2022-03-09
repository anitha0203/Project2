import { City } from "./city.model";
import { Weather } from "./weather.model";

export interface Forecastweather {
    city: City;
    weathers: Weather[];
}
