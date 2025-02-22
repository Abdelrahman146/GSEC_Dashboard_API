"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/geoanalyzer/PublicSchoolsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var Debug_1 = __importDefault(require("../Debug"));
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var PublicSchoolsLoader = /** @class */ (function () {
    function PublicSchoolsLoader() {
        this.publicSchoolsUrl = configuration_1.default.GEO_ANALYZER_PUBLIC_SCHOOLS_PRO;
        this.publicSchools = [];
        this.loadPublicSchools();
        this.reload();
    }
    // fetch all publicSchools from the server to the object
    PublicSchoolsLoader.prototype.loadPublicSchools = function () {
        var _this = this;
        var that = this;
        arcgis_rest_feature_service_1.queryFeatures({
            url: this.publicSchoolsUrl,
            where: "1=1"
        })
            .then(function (results) {
            _this.publicSchools = results.features;
            console.log("PublicSchoolsLoader: successfully retrieved " + _this.publicSchools.length + " schools");
            Debug_1.default.msg('info', 'PublicSchoolsLoader', "retrieved " + _this.publicSchools.length + " schools");
        }).catch(function (err) {
            console.error("PublicSchoolsLoader: error: " + err);
            Debug_1.default.msg('error', 'PublicSchoolsLoader', "" + err);
        });
    };
    // get all publicSchools from publicSchools object
    PublicSchoolsLoader.prototype.getAllPublicSchools = function () {
        return this.publicSchools;
    };
    // // get a specific publicSchools by geometry
    // public getPublicSchoolsByGeometry(geometry: any): number {
    //     let result: any = [];
    //     this.publicSchools.forEach(element => {
    //         if(geometry.contains(element.geometry)) {
    //             result.push(element);
    //         }
    //     });
    //     return result;
    // }
    PublicSchoolsLoader.prototype.reload = function () {
        var _this = this;
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(function () {
            var hour = new Date().getHours();
            if (hour == 8 || hour == 12) {
                Debug_1.default.msg('info', 'PublicSchoolsLoader', 'started to reload as per the time interval');
                _this.loadPublicSchools();
            }
        }, 3600000);
    };
    return PublicSchoolsLoader;
}());
exports.default = new PublicSchoolsLoader();
//# sourceMappingURL=PublicSchoolsLoader.js.map