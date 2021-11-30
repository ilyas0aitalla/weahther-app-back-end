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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const weather_service_1 = require("./weather.service");
let AppController = class AppController {
    constructor(weatherService) {
        this.weatherService = weatherService;
    }
    ;
    createDatesPack(dateInMilliseconds) {
        const dateMs = parseInt(dateInMilliseconds), requestDayStr = new Date(dateMs).toDateString(), requestDayMs = new Date(requestDayStr).getTime(), requestDaySec = Math.round(requestDayMs / 1000), todayStr = new Date().toDateString(), todayMs = new Date(todayStr).getTime(), firstAvailableDay = new Date(todayMs - 518400000).getTime(), lastAvailableDay = new Date(todayMs + 691200000).getTime();
        return {
            requestDayStr,
            requestDayMs,
            requestDaySec,
            todayStr,
            todayMs,
            firstAvailableDay,
            lastAvailableDay
        };
    }
    async getWeather(params) {
        const datePack = this.createDatesPack(params.dateMs);
        if (datePack.requestDayMs === datePack.todayMs) {
            console.log("\nGETTING TODAY\n#############\n");
            const todayWeather = await this.weatherService.getToday(params.location);
            if (todayWeather.requestSuccess) {
                return todayWeather;
            }
            return {
                message: "Failure"
            };
        }
        else if (datePack.requestDayMs < datePack.todayMs && datePack.requestDayMs >= datePack.firstAvailableDay) {
            console.log("\nGETTING HISTORY\n###############\n");
            const coords = await this.weatherService.getCoords(params.location);
            if (coords.requestSuccess) {
                const { lat, lon, city } = coords;
                const history = await this.weatherService.getHistory(lat, lon, datePack.requestDaySec);
                if (history.requestSuccess) {
                    const { day, description, icon } = history;
                    return {
                        message: "Success",
                        city,
                        day,
                        description,
                        icon
                    };
                }
            }
            return {
                message: "Failure"
            };
        }
        else if (datePack.requestDayMs > datePack.todayMs && datePack.requestDayMs <= datePack.lastAvailableDay) {
            console.log("\nGETTING FORECAST\n################\n");
            const coords = await this.weatherService.getCoords(params.location);
            if (coords.requestSuccess) {
                const { lat, lon, city } = coords;
                const forecast = await this.weatherService.getForecast(lat, lon, datePack.requestDayStr);
                if (forecast.requestSuccess) {
                    const { day, description, icon } = forecast;
                    return {
                        message: "Success",
                        city,
                        day,
                        description,
                        icon
                    };
                }
            }
            return {
                message: "Failure"
            };
        }
        else {
            console.log("\nWeather unavailable\n###################\n");
            return {
                message: "Failure"
            };
        }
    }
};
__decorate([
    common_1.Get(':location/:dateMs'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getWeather", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [weather_service_1.WeatherService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map