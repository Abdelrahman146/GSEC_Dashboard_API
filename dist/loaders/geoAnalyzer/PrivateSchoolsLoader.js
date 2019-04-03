"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/geoanalyzer/PrivateSchoolsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var Debug_1 = __importDefault(require("../Debug"));
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var PrivateSchoolsLoader = /** @class */ (function () {
    function PrivateSchoolsLoader() {
        this.privateSchoolsUrl = configuration_1.default.GEO_ANALYZER_PRIVATE_SCHOOLS_PRO;
        this.privateSchools = [];
        this.loadPrivateSchools();
        this.reload();
    }
    // fetch all privateSchools from the server to the object
    PrivateSchoolsLoader.prototype.loadPrivateSchools = function () {
        var _this = this;
        var that = this;
        arcgis_rest_feature_service_1.queryFeatures({
            url: this.privateSchoolsUrl,
            where: "1=1"
        })
            .then(function (results) {
            _this.privateSchools = results.features;
            console.log("PrivateSchoolsLoader: successfully retrieved " + _this.privateSchools.length + " schools");
            Debug_1.default.msg('info', 'PrivateSchoolsLoader', "retrieved " + _this.privateSchools.length + " schools");
        }).catch(function (err) {
            console.error("PrivateSchoolsLoader: error: " + err);
            Debug_1.default.msg('error', 'PrivateSchoolsLoader', "" + err);
        });
    };
    // get all privateSchools from privateSchools object
    PrivateSchoolsLoader.prototype.getAllPrivateSchools = function () {
        return this.privateSchools;
    };
    // // get a specific privateSchools by geometry
    // public getPrivateSchoolsByGeometry(geometry: any): any {
    //     let result: any = [];
    //     this.privateSchools.forEach(element => {
    //         if(geometry.contains(element.geometry)) {
    //             result.push(element);
    //         }
    //     });
    //     return result;
    // }
    PrivateSchoolsLoader.prototype.reload = function () {
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(this.loadPrivateSchools, 86400000);
    };
    return PrivateSchoolsLoader;
}());
exports.default = new PrivateSchoolsLoader();
//# sourceMappingURL=PrivateSchoolsLoader.js.map