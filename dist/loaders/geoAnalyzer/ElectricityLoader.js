"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/geoanalyzer/ElectricityLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var Debug_1 = __importDefault(require("../Debug"));
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var ElectricityLoader = /** @class */ (function () {
    function ElectricityLoader() {
        this.electricityConsumptionUrl = configuration_1.default.GEO_ANALYZER_ELECTRIC_CONSUMPTION_PRO;
        this.electricityConsumption = [];
        this.loadElectricity();
        this.reload();
    }
    // fetch all electricityConsumption from the server to the object
    ElectricityLoader.prototype.loadElectricity = function () {
        var _this = this;
        var that = this;
        arcgis_rest_feature_service_1.queryFeatures({
            url: this.electricityConsumptionUrl,
            where: "1=1"
        })
            .then(function (results) {
            _this.electricityConsumption = results.features;
            console.log("ElectricityLoader: retrieved " + _this.electricityConsumption.length + " object");
            Debug_1.default.msg('info', 'ElectricityLoader', "retrieved " + _this.electricityConsumption.length + " object");
        }).catch(function (err) {
            console.error("ElectricityLoader: error: " + err);
            Debug_1.default.msg('error', 'ElectricityLoader', "" + err);
        });
    };
    ElectricityLoader.prototype.getElectricityObject = function () {
        return this.electricityConsumption;
    };
    // get a specific electricityConsumption by geometry
    ElectricityLoader.prototype.getTotalElectricityConsumptionByGeometry = function (geometry) {
        var result = 0;
        this.electricityConsumption.forEach(function (element) {
            if (geometry.contains(element.geometry)) {
                result += element.attributes.E_DAILY_CONS_KWH;
            }
        });
        return result;
    };
    ElectricityLoader.prototype.reload = function () {
        var _this = this;
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(function () {
            var hour = new Date().getHours();
            if (hour == 8 || hour == 12) {
                Debug_1.default.msg('info', 'ElectricityLoader', 'started to reload as per the time interval');
                _this.loadElectricity();
            }
        }, 3600000);
    };
    return ElectricityLoader;
}());
exports.default = new ElectricityLoader();
//# sourceMappingURL=ElectricityLoader.js.map