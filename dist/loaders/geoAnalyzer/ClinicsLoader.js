"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/geoanalyzer/ClinicsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var Debug_1 = __importDefault(require("../Debug"));
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var ClinicsLoader = /** @class */ (function () {
    function ClinicsLoader() {
        this.clinicsUrl = configuration_1.default.GEO_ANALYZER_CLINICS_PRO;
        this.clinics = [];
        this.loadClinics();
        this.reload();
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
            Debug_1.default.msg('info', 'ClinicsLoader', "retreived " + _this.clinics.length + " clinics");
        }).catch(function (err) {
            console.error("error: " + err);
            Debug_1.default.msg('error', 'ClinicsLoader', "" + err);
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
    ClinicsLoader.prototype.reload = function () {
        var _this = this;
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(function () {
            var hour = new Date().getHours();
            if (hour == 8 || hour == 12) {
                Debug_1.default.msg('info', 'ClinicsLoader', 'started to reload as per the time interval');
                _this.loadClinics();
            }
        }, 3600000);
    };
    return ClinicsLoader;
}());
exports.default = new ClinicsLoader();
//# sourceMappingURL=ClinicsLoader.js.map