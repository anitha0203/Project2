export interface Environment {
    production: boolean;
    openweathermapApi: {
        rootUrl: string;
        appId: string;
    };
    iconsRootUrl: string;
    numberOfForecastedDays: number;
    currentWeatherCacheInMinutes: number;
}

