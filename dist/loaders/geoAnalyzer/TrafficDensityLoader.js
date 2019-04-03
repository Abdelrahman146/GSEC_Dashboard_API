"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/geoanalyzer/TrafficDensityAreasLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var Debug_1 = __importDefault(require("../Debug"));
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var TrafficDensityAreasLoader = /** @class */ (function () {
    function TrafficDensityAreasLoader() {
        this.trafficDensityAreasUrl = configuration_1.default.HIGH_TRAFFIC_DENSITY_AREAS_PRO;
        this.trafficDensityAreas = [];
        this.loadTrafficDensityAreas();
        this.reload();
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
            Debug_1.default.msg('info', 'TrafficDensityAreasLoader', "retrieved " + _this.trafficDensityAreas.length + " object");
        }).catch(function (err) {
            console.error("TrafficDensityAreasLoader: error: " + err);
            Debug_1.default.msg('error', 'TrafficDensityAreasLoader', "" + err);
        });
    };
    // get all trafficDensityAreas from trafficDensityAreas object
    TrafficDensityAreasLoader.prototype.getAllTrafficDensityAreas = function () {
        return this.trafficDensityAreas;
    };
    TrafficDensityAreasLoader.prototype.reload = function () {
        var _this = this;
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(function () {
            var hour = new Date().getHours();
            if (hour == 1) {
                Debug_1.default.msg('info', 'TrafficDensityAreasLoader', 'started to reload as per the time interval');
                _this.loadTrafficDensityAreas();
            }
        }, 3600000);
    };
    return TrafficDensityAreasLoader;
}());
exports.default = new TrafficDensityAreasLoader();
//# sourceMappingURL=TrafficDensityLoader.js.map