"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/TrafficDensityAreasLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var TrafficDensityAreasLoader = /** @class */ (function () {
    function TrafficDensityAreasLoader() {
        this.trafficDensityAreasUrl = configuration_1.default.HIGH_TRAFFIC_DENSITY_AREAS_PRO;
        this.trafficDensityAreas = [];
        console.log("TrafficDensityAreasLoader initiated");
        this.loadTrafficDensityAreas();
    }
    // fetch all trafficDensityAreas from the server to the object
    TrafficDensityAreasLoader.prototype.loadTrafficDensityAreas = function () {
        var _this = this;
        var that = this;
        arcgis_rest_feature_service_1.queryFeatures({
            url: this.trafficDensityAreasUrl,
            where: "1=1"
        })
            .then(function (results) {
            _this.trafficDensityAreas = results.features;
            console.log("TrafficDensityAreasLoader: successfully retrieved " + _this.trafficDensityAreas.length + " object");
        }).catch(function (err) {
            console.error("TrafficDensityAreasLoader: error: " + err);
        });
    };
    // get all trafficDensityAreas from trafficDensityAreas object
    TrafficDensityAreasLoader.prototype.getAllTrafficDensityAreas = function () {
        return this.trafficDensityAreas;
    };
    return TrafficDensityAreasLoader;
}());
exports.default = new TrafficDensityAreasLoader();
//# sourceMappingURL=TrafficDensityLoader.js.map