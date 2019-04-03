"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/geoanalyzer/WaterLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var Debug_1 = __importDefault(require("../Debug"));
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var WaterLoader = /** @class */ (function () {
    function WaterLoader() {
        this.waterConsumptionUrl = configuration_1.default.GEO_ANALYZER_WATER_CONSUMPTION_PRO;
        this.waterConsumption = [];
        this.loadWater();
        this.reload();
    }
    // fetch all waterConsumption from the server to the object
    WaterLoader.prototype.loadWater = function () {
        var _this = this;
        var that = this;
        arcgis_rest_feature_service_1.queryFeatures({
            url: this.waterConsumptionUrl,
            where: "1=1"
        })
            .then(function (results) {
            _this.waterConsumption = results.features;
            console.log("WaterConsumptionLoader: successfully retrieved " + _this.waterConsumption.length + " object");
            Debug_1.default.msg('info', 'WaterConsumptionLoader', "retrieved " + _this.waterConsumption.length + " object");
        }).catch(function (err) {
            console.error("error: " + err);
            Debug_1.default.msg('error', 'WaterConsumptionLoader', "" + err);
        });
    };
    // get all waterConsumption from waterConsumption object
    WaterLoader.prototype.getWaterObject = function () {
        return this.waterConsumption;
    };
    // // get a specific waterConsumption by geometry
    // public getTotalWaterConsumptionByGeometry(geometry: any): number {
    //     let result: number = 0;
    //     this.waterConsumption.forEach(element => {
    //         if(geometry.contains(element.geometry)) {
    //             result += element.attributes.W_DAILY_CONS_M3;
    //         }
    //     });
    //     return result;
    // }
    WaterLoader.prototype.reload = function () {
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(this.loadWater, 86400000);
    };
    return WaterLoader;
}());
exports.default = new WaterLoader();
//# sourceMappingURL=WaterLoader.js.map