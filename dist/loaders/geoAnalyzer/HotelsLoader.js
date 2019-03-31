"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/HotelsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var HotelsLoader = /** @class */ (function () {
    function HotelsLoader() {
        this.hotelsUrl = configuration_1.default.GEO_ANALYZER_HOTELS_PRO;
        this.hotels = [];
        console.log("HotelsLoader: initiated");
        this.loadHotels();
    }
    // fetch all hotels from the server to the object
    HotelsLoader.prototype.loadHotels = function () {
        var _this = this;
        var that = this;
        arcgis_rest_feature_service_1.queryFeatures({
            url: this.hotelsUrl,
            where: "1=1"
        })
            .then(function (results) {
            _this.hotels = results.features;
            console.log("HotelsLoader: successfully retrieved " + _this.hotels.length + " hotel");
        }).catch(function (err) {
            console.error("error: " + err);
        });
    };
    // get all hotels from hotels object
    HotelsLoader.prototype.getAllHotels = function () {
        return this.hotels;
    };
    return HotelsLoader;
}());
exports.default = new HotelsLoader();
//# sourceMappingURL=HotelsLoader.js.map