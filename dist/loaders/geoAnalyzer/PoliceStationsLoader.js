"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/geoanalyzer/PoliceStationsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var PoliceStationsLoader = /** @class */ (function () {
    function PoliceStationsLoader() {
        this.policeStationUrl = configuration_1.default.GEO_ANALYZER_POLICE_STATIONS_PRO;
        this.policeStation = [];
        this.loadPoliceStations();
        this.reload();
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
    // // get a specific policeStation by geometry
    // public getPoliceStationsByGeometry(geometry: any): any {
    //     let result: any = [];
    //     this.policeStation.forEach(element => {
    //         if(geometry.contains(element.geometry)) {
    //             result.push(element);
    //         }
    //     });
    //     return result;
    // }
    PoliceStationsLoader.prototype.reload = function () {
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(this.loadPoliceStations, 86400000);
    };
    return PoliceStationsLoader;
}());
exports.default = new PoliceStationsLoader();
//# sourceMappingURL=PoliceStationsLoader.js.map