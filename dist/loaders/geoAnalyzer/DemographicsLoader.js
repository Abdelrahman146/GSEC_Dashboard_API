"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/geoanalyzer/DemographicsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var Debug_1 = __importDefault(require("../Debug"));
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var DemographicsLoader = /** @class */ (function () {
    function DemographicsLoader() {
        this.demographicsUrl = configuration_1.default.GEO_ANALYZER_DEMOGRAPHICS_PRO;
        this.demographics = [];
        this.loadDemographics();
        this.reload();
    }
    // fetch all demographics from the server to the object
    DemographicsLoader.prototype.loadDemographics = function () {
        var _this = this;
        var that = this;
        arcgis_rest_feature_service_1.queryFeatures({
            url: this.demographicsUrl,
            where: "1=1"
        })
            .then(function (results) {
            _this.demographics = results.features;
            console.log("DemographicsLoader: retreived " + _this.demographics.length + " object");
            Debug_1.default.msg('info', 'DemographicsLoader', "retreived " + _this.demographics.length + " object");
        }).catch(function (err) {
            console.error("DemographicsLoader: error: " + err);
            Debug_1.default.msg('error', 'DemographicsLoader', "" + err);
        });
    };
    // get all demographics from demographics object
    DemographicsLoader.prototype.getAllDemographics = function () {
        return this.demographics;
    };
    // // get usual residents by geometry
    // public getTotalUsualResidentsByGeometry(geometry: any): number {
    //     let result: number = 0;
    //     this.demographics.forEach(element => {
    //         if(geometry.contains(element.geometry)) {
    //             result += element.attributes.Usual_Residents;
    //         }
    //     });
    //     return result;
    // }
    // // get citizens by geometry
    // public getTotalCitizensByGeometry(geometry: any): number {
    //     let result: number = 0;
    //     this.demographics.forEach(element => {
    //         if(geometry.contains(element.geometry)) {
    //             result += element.attributes.Citizen;
    //         }
    //     });
    //     return result;
    // }
    // // get non-citizens by geometry
    // public getTotalNonCitizensByGeometry(geometry: any): number {
    //     let result: number = 0;
    //     this.demographics.forEach(element => {
    //         if(geometry.contains(element.geometry)) {
    //             result += element.attributes.Non_Citizen;
    //         }
    //     });
    //     return result;
    // }
    // get female citizens by geometry
    DemographicsLoader.prototype.getTotalFemaleCitizensByGeometry = function (geometry) {
        var result = 0;
        this.demographics.forEach(function (element) {
            if (geometry.contains(element.geometry)) {
                result += element.attributes.Citizen_Females;
            }
        });
        return result;
    };
    // get male citizens by geometry
    DemographicsLoader.prototype.getTotalMaleCitizensByGeometry = function (geometry) {
        var result = 0;
        this.demographics.forEach(function (element) {
            if (geometry.contains(element.geometry)) {
                result += element.attributes.Citizen_Males;
            }
        });
        return result;
    };
    DemographicsLoader.prototype.reload = function () {
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(this.loadDemographics, 86400000);
    };
    return DemographicsLoader;
}());
exports.default = new DemographicsLoader();
//# sourceMappingURL=DemographicsLoader.js.map