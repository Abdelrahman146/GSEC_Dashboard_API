"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/ClinicsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var ClinicsLoader = /** @class */ (function () {
    function ClinicsLoader() {
        this.clinicsUrl = configuration_1.default.GEO_ANALYZER_CLINICS_PRO;
        this.clinics = [];
        console.log("ClinicsLoader initiated");
        this.loadClinics();
    }
    // fetch all clinics from the server to the object
    ClinicsLoader.prototype.loadClinics = function () {
        var _this = this;
        var that = this;
        arcgis_rest_feature_service_1.queryFeatures({
            url: this.clinicsUrl,
            where: "1=1"
        })
            .then(function (results) {
            _this.clinics = results.features;
            console.log("ClinicsLoader: retreived " + _this.clinics.length + " clinics");
        }).catch(function (err) {
            console.error("error: " + err);
        });
    };
    ClinicsLoader.prototype.getAllClinics = function () {
        return this.clinics;
    };
    // get a specific clinics by geometry
    ClinicsLoader.prototype.getClinicsByGeometry = function (geometry) {
        var result = [];
        this.clinics.forEach(function (element) {
            if (geometry.contains(element.geometry)) {
                result.push(element);
            }
        });
        return result;
    };
    return ClinicsLoader;
}());
exports.default = new ClinicsLoader();
//# sourceMappingURL=ClinicsLoader.js.map