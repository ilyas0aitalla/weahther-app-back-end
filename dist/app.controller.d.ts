import { WeatherService } from './weather.service';
export declare class AppController {
    private readonly weatherService;
    constructor(weatherService: WeatherService);
    createDatesPack(dateInMilliseconds: string): {
        requestDayStr: string;
        requestDayMs: number;
        requestDaySec: number;
        todayStr: string;
        todayMs: number;
        firstAvailableDay: number;
        lastAvailableDay: number;
    };
    getWeather(params: any): Promise<any>;
}
