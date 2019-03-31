"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/PrivateSchoolsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var PrivateSchoolsLoader = /** @class */ (function () {
    function PrivateSchoolsLoader() {
        this.privateSchoolsUrl = configuration_1.default.GEO_ANALYZER_PRIVATE_SCHOOLS_PRO;
        this.privateSchools = [];
        console.log("PrivateSchoolsLoader: initiated");
        this.loadPrivateSchools();
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
        }).catch(function (err) {
            console.error("PrivateSchoolsLoader: error: " + err);
        });
    };
    // get all privateSchools from privateSchools object
    PrivateSchoolsLoader.prototype.getAllPrivateSchools = function () {
        return this.privateSchools;
    };
    return PrivateSchoolsLoader;
}());
exports.default = new PrivateSchoolsLoader();
//# sourceMappingURL=PrivateSchoolsLoader.js.map