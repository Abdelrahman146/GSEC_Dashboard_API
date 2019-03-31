"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/PoliceStationsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var PoliceStationsLoader = /** @class */ (function () {
    function PoliceStationsLoader() {
        this.policeStationUrl = configuration_1.default.GEO_ANALYZER_POLICE_STATIONS_PRO;
        this.policeStation = [];
        console.log("PoliceStationsLoader initiated");
        this.loadPoliceStations();
    }
    // fetch all policeStation from the server to the object
    PoliceStationsLoader.prototype.loadPoliceStations = function () {
        var _this = this;
        var that = this;
        arcgis_rest_feature_service_1.queryFeatures({
            url: this.policeStationUrl,
            where: "1=1"
        })
            .then(function (results) {
            _this.policeStation = results.features;
            console.log("PoliceStationsLoader: successfully retrieved " + _this.policeStation.length + " stations");
        }).catch(function (err) {
            console.error("PoliceStationsLoader: error: " + err);
        });
    };
    // get all policeStation from policeStation object
    PoliceStationsLoader.prototype.getAllPoliceStations = function () {
        return this.policeStation;
    };
    return PoliceStationsLoader;
}());
exports.default = new PoliceStationsLoader();
//# sourceMappingURL=PoliceStationsLoader.js.map