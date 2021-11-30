import { HttpService } from '@nestjs/common';
export declare class WeatherService {
    private readonly httpService;
    private readonly apiKey;
    constructor(httpService: HttpService);
    getCoords(location: string): Promise<{
        requestSuccess: boolean;
        city: string;
        lat: any;
        lon: any;
    } | {
        requestSuccess: boolean;
        city?: undefined;
        lat?: undefined;
        lon?: undefined;
    }>;
    getToday(location: any): Promise<{
        requestSuccess: boolean;
        city: string;
        day: string;
        description: any;
        icon: any;
    } | {
        requestSuccess: boolean;
        city?: undefined;
        day?: undefined;
        description?: undefined;
        icon?: undefined;
    }>;
    getForecast(lat: number, lon: number, dayToLook: string): Promise<{
        requestSuccess: boolean;
        day: string;
        description: any;
        icon: any;
    } | {
        requestSuccess: boolean;
        day?: undefined;
        description?: undefined;
        icon?: undefined;
    }>;
    getHistory(lat: number, lon: number, daySec: number): Promise<{
        requestSuccess: boolean;
        day: string;
        description: any;
        icon: any;
    } | {
        requestSuccess: boolean;
        day?: undefined;
        description?: undefined;
        icon?: undefined;
    }>;
}
