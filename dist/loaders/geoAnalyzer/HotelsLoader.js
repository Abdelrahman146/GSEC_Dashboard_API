"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/geoanalyzer/HotelsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var Debug_1 = __importDefault(require("../Debug"));
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var HotelsLoader = /** @class */ (function () {
    function HotelsLoader() {
        this.hotelsUrl = configuration_1.default.GEO_ANALYZER_HOTELS_PRO;
        this.hotels = [];
        this.loadHotels();
        this.reload();
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
            Debug_1.default.msg('info', 'HotelsLoader', "retrieved " + _this.hotels.length + " hotel");
        }).catch(function (err) {
            console.error("error: " + err);
            Debug_1.default.msg('error', 'HotelsLoader', "" + err);
        });
    };
    // get all hotels from hotels object
    HotelsLoader.prototype.getAllHotels = function () {
        return this.hotels;
    };
    // // get a specific hotels by geometry
    // public getHotelsByGeometry(geometry: any): any {
    //     let result: any = [];
    //     this.hotels.forEach(element => {
    //         if(geometry.contains(element.geometry)) {
    //             result.push(element);
    //         }
    //     });
    //     return result;
    // }
    HotelsLoader.prototype.reload = function () {
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(this.loadHotels, 86400000);
    };
    return HotelsLoader;
}());
exports.default = new HotelsLoader();
//# sourceMappingURL=HotelsLoader.js.map