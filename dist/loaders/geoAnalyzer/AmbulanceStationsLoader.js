"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/geoanalyzer/AmbulanceStationsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var AmbulanceStationsLoader = /** @class */ (function () {
    function AmbulanceStationsLoader() {
        this.ambulanceStationsUrl = configuration_1.default.GEO_ANALYZER_AMBULANCE_STATIONS_PRO;
        this.ambulanceStations = [];
        this.loadAmbulanceStations();
        this.reload();
    }
    // fetch all ambulanceStations from the server to the object
    AmbulanceStationsLoader.prototype.loadAmbulanceStations = function () {
        var _this = this;
        var that = this;
        arcgis_rest_feature_service_1.queryFeatures({
            url: this.ambulanceStationsUrl,
            where: "1=1"
        })
            .then(function (results) {
            _this.ambulanceStations = results.features;
            console.log("AmbulanceStationsLoader: successfully retrieved " + _this.ambulanceStations.length + " objects");
        }).catch(function (err) {
            console.error("AmbulanceStationsLoader: error: " + err);
        });
    };
    AmbulanceStationsLoader.prototype.getAllAmbulanceStations = function () {
        return this.ambulanceStations;
    };
    // get a specific ambulanceStations by geometry
    AmbulanceStationsLoader.prototype.getAmbulanceStationsByGeometry = function (geometry) {
        var result = [];
        this.ambulanceStations.forEach(function (element) {
            if (geometry.contains(element.geometry)) {
                result.push(element);
            }
        });
        return result;
    };
    AmbulanceStationsLoader.prototype.reload = function () {
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(this.loadAmbulanceStations, 86400000);
    };
    return AmbulanceStationsLoader;
}());
exports.default = new AmbulanceStationsLoader();
//# sourceMappingURL=AmbulanceStationsLoader.js.map