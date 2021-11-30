"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const common_1 = require("@nestjs/common");
let WeatherService = class WeatherService {
    constructor(httpService) {
        this.httpService = httpService;
        this.apiKey = "c9661625b3eb09eed099288fbfad560a";
    }
    async getCoords(location) {
        const res = await this.httpService.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.apiKey}`).toPromise();
        if (res.data && res.data.cod === 200) {
            const city = `${res.data.name}, ${res.data.sys.country}`;
            const { lon, lat } = res.data.coord;
            return {
                requestSuccess: true,
                city,
                lat,
                lon
            };
        }
        return {
            requestSuccess: false
        };
    }
    async getToday(location) {
        const res = await this.httpService.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.apiKey}`).toPromise();
        if (res.data && res.data.cod === 200) {
            const city = `${res.data.name}, ${res.data.sys.country}`;
            const day = new Date(res.data.dt * 1000).toDateString();
            const { description, icon } = res.data.weather[0];
            console.log(description);
            console.log(icon);
            return {
                requestSuccess: true,
                city,
                day,
                description,
                icon
            };
        }
        return {
            requestSuccess: false
        };
    }
    async getForecast(lat, lon, dayToLook) {
        let res = await this.httpService.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${this.apiKey}`).toPromise();
        if (res.data) {
            for (const day of res.data.daily) {
                const dateString = new Date(day.dt * 1000).toDateString();
                if (dayToLook === dateString) {
                    const { description, icon } = day.weather[0];
                    return {
                        requestSuccess: true,
                        day: dateString,
                        description,
                        icon
                    };
                }
            }
        }
        return {
            requestSuccess: false
        };
    }
    async getHistory(lat, lon, daySec) {
        let res = await this.httpService.get(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${daySec}&appid=${this.apiKey}`).toPromise();
        if (res.data) {
            const dayToLook = new Date(daySec * 1000).toDateString();
            const dateString = new Date(res.data.current.dt * 1000).toDateString();
            if (dayToLook === dateString) {
                const { description, icon } = res.data.current.weather[0];
                return {
                    requestSuccess: true,
                    day: dateString,
                    description,
                    icon
                };
            }
        }
        return {
            requestSuccess: false
        };
    }
};
WeatherService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], WeatherService);
exports.WeatherService = WeatherService;
//# sourceMappingURL=weather.service.js.map