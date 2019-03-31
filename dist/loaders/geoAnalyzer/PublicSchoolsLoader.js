"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/PublicSchoolsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var PublicSchoolsLoader = /** @class */ (function () {
    function PublicSchoolsLoader() {
        this.publicSchoolsUrl = configuration_1.default.GEO_ANALYZER_PUBLIC_SCHOOLS_PRO;
        this.publicSchools = [];
        console.log("PublicSchoolsLoader initiated");
        this.loadPublicSchools();
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
        }).catch(function (err) {
            console.error("PublicSchoolsLoader: error: " + err);
        });
    };
    // get all publicSchools from publicSchools object
    PublicSchoolsLoader.prototype.getAllPublicSchools = function () {
        return this.publicSchools;
    };
    return PublicSchoolsLoader;
}());
exports.default = new PublicSchoolsLoader();
//# sourceMappingURL=PublicSchoolsLoader.js.map