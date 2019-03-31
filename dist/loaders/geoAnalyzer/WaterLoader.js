"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/WaterLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var WaterLoader = /** @class */ (function () {
    function WaterLoader() {
        this.waterConsumptionUrl = configuration_1.default.GEO_ANALYZER_WATER_CONSUMPTION_PRO;
        this.waterConsumption = [];
        console.log("WaterConsumptionLoader: initiated");
        this.loadWater();
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
        }).catch(function (err) {
            console.error("error: " + err);
        });
    };
    // get all waterConsumption from waterConsumption object
    WaterLoader.prototype.getWaterObject = function () {
        return this.waterConsumption;
    };
    return WaterLoader;
}());
exports.default = new WaterLoader();
//# sourceMappingURL=WaterLoader.js.map