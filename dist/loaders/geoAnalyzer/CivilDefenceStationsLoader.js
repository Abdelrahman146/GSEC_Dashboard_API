"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/CivilDefenceStationsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var CivilDefenceStationsLoader = /** @class */ (function () {
    function CivilDefenceStationsLoader() {
        this.civilDefenceStationsUrl = configuration_1.default.GEO_ANALYZER_CIVIL_DEFINCE_STATIONS_PRO;
        this.civilDefenceStations = [];
        console.log("CivilDefenceStationsLoader initiated");
        this.loadCivilDefenceStations();
    }
    // fetch all civilDefenceStations from the server to the object
    CivilDefenceStationsLoader.prototype.loadCivilDefenceStations = function () {
        var _this = this;
        var that = this;
        arcgis_rest_feature_service_1.queryFeatures({
            url: this.civilDefenceStationsUrl,
            where: "1=1"
        })
            .then(function (results) {
            _this.civilDefenceStations = results.features;
            console.log("CivilDefenceStationsLoader: retreived " + _this.civilDefenceStations.length + " stations");
        }).catch(function (err) {
            console.error("error: " + err);
        });
    };
    CivilDefenceStationsLoader.prototype.getAllCivilDefenceStations = function () {
        return this.civilDefenceStations;
    };
    // get a specific civilDefenceStations by geometry
    CivilDefenceStationsLoader.prototype.getCivilDefenceStationsByGeometry = function (geometry) {
        var result = [];
        this.civilDefenceStations.forEach(function (element) {
            if (geometry.contains(element.geometry)) {
                result.push(element);
            }
        });
        return result;
    };
    return CivilDefenceStationsLoader;
}());
exports.default = new CivilDefenceStationsLoader();
//# sourceMappingURL=CivilDefenceStationsLoader.js.map