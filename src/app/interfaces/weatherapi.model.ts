import { WeatherEnum } from "./weather.enum";

export interface Weatherapi {
    id: number;
    main: WeatherEnum;
    description: string;
    icon: string;
}

