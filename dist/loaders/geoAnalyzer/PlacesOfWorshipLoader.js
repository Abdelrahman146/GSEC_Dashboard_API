"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/geoanalyzer/PlacesOfWorshipLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var Debug_1 = __importDefault(require("../Debug"));
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var PlacesOfWorshipLoader = /** @class */ (function () {
    function PlacesOfWorshipLoader() {
        this.placesOfWorshipUrl = configuration_1.default.GEO_ANALYZER_PLACES_OF_WORSHIP_PRO;
        this.placesOfWorship = [];
        this.loadPlacesOfWorship();
        this.reload();
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
            Debug_1.default.msg('info', 'placesOfWorshipLoader', "retrieved " + _this.placesOfWorship.length + " placesOfWorship");
        }).catch(function (err) {
            console.error("placesOfWorshipLoader: error: " + err);
            Debug_1.default.msg('error', 'placesOfWorshipLoader', "" + err);
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
    PlacesOfWorshipLoader.prototype.reload = function () {
        var _this = this;
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(function () {
            var hour = new Date().getHours();
            if (hour == 8 || hour == 12) {
                Debug_1.default.msg('info', 'placesOfWorshipLoader', 'started to reload as per the time interval');
                _this.loadPlacesOfWorship();
            }
        }, 3600000);
    };
    return PlacesOfWorshipLoader;
}());
exports.default = new PlacesOfWorshipLoader();
//# sourceMappingURL=PlacesOfWorshipLoader.js.map