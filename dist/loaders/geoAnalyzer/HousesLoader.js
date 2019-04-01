"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/geoanalyzer/HousesLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var HousesLoader = /** @class */ (function () {
    function HousesLoader() {
        this.housesUrl = configuration_1.default.GEO_ANALYZER_HOUSES_PRO;
        this.houses = [];
        this.loadHouses();
        this.reload();
    }
    // fetch all houses from the server to the object
    HousesLoader.prototype.loadHouses = function () {
        var _this = this;
        var that = this;
        arcgis_rest_feature_service_1.queryFeatures({
            url: this.housesUrl,
            where: "1=1"
        })
            .then(function (results) {
            _this.houses = results.features;
            console.log("HousesLoader: successfully retrieved " + _this.houses.length + " houses");
        }).catch(function (err) {
            console.error("HousesLoader: " + err);
        });
    };
    // get all houses from houses object
    HousesLoader.prototype.getAllHouses = function () {
        return this.houses;
    };
    // get a specific houses by geometry
    HousesLoader.prototype.getHousesByGeometry = function (geometry) {
        var result = [];
        this.houses.forEach(function (element) {
            if (geometry.contains(element.geometry)) {
                result.push(element);
            }
        });
        return result;
    };
    HousesLoader.prototype.reload = function () {
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(this.loadHouses, 86400000);
    };
    return HousesLoader;
}());
exports.default = new HousesLoader();
//# sourceMappingURL=HousesLoader.js.map