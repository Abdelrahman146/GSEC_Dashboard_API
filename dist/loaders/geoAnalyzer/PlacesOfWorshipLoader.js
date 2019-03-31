"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/PlacesOfWorshipLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var PlacesOfWorshipLoader = /** @class */ (function () {
    function PlacesOfWorshipLoader() {
        this.placesOfWorshipUrl = configuration_1.default.GEO_ANALYZER_PLACES_OF_WORSHIP_PRO;
        this.placesOfWorship = [];
        console.log("PlacesOfWorshipLoader: initiated");
        this.loadPlacesOfWorship();
    }
    // fetch all placesOfWorship from the server to the object
    PlacesOfWorshipLoader.prototype.loadPlacesOfWorship = function () {
        var _this = this;
        var that = this;
        arcgis_rest_feature_service_1.queryFeatures({
            url: this.placesOfWorshipUrl,
            where: "1=1"
        })
            .then(function (results) {
            _this.placesOfWorship = results.features;
            console.log("placesOfWorshipLoader: successfully retrieved " + _this.placesOfWorship.length + " placesOfWorship");
        }).catch(function (err) {
            console.error("placesOfWorshipLoader: error: " + err);
        });
    };
    PlacesOfWorshipLoader.prototype.getAllPlacesOfWorship = function () {
        return this.placesOfWorship;
    };
    // get a specific placesOfWorship by geometry
    PlacesOfWorshipLoader.prototype.getPlacesOfWorshipByGeometry = function (geometry) {
        var result = [];
        this.placesOfWorship.forEach(function (element) {
            if (geometry.contains(element.geometry)) {
                result.push(element);
            }
        });
        return result;
    };
    return PlacesOfWorshipLoader;
}());
exports.default = new PlacesOfWorshipLoader();
//# sourceMappingURL=PlacesOfWorshipLoader.js.map