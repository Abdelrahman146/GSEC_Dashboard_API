"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/features/PolygonsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var Debug_1 = __importDefault(require("../Debug"));
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var PolygonsLoader = /** @class */ (function () {
    function PolygonsLoader() {
        //private polygonsUrl = 'https://almeydan.ecouncil.ae/arcgis/rest/services/gsec_application/polygons/FeatureServer/2';
        this.polygonsUrl = configuration_1.default.PROJECTS_MAP_DASHBOARD_POLY_PRO;
        this.polygons = [];
        this.loadPolygons();
        this.reload();
    }
    // fetch all polygons from the server to the object
    PolygonsLoader.prototype.loadPolygons = function () {
        var _this = this;
        var that = this;
        arcgis_rest_feature_service_1.queryFeatures({
            url: this.polygonsUrl,
            where: "1=1"
        })
            .then(function (results) {
            _this.polygons = results.features;
            console.log("PolygonsLoader: successfully retrieved " + _this.polygons.length + " objects");
            Debug_1.default.msg('info', 'PolygonsLoader', "retrieved " + _this.polygons.length + " objects");
        }).catch(function (err) {
            console.error("polygonsLoader: error: " + err);
            Debug_1.default.msg('error', 'polygonsLoader', "" + err);
        });
    };
    // get all polygons from polygons object
    PolygonsLoader.prototype.getAllPolygons = function () {
        return this.polygons;
    };
    PolygonsLoader.prototype.reload = function () {
        var _this = this;
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(function () {
            var hour = new Date().getHours();
            if (hour == 1) {
                Debug_1.default.msg('info', 'polygonsLoader', 'Projects has started to reload as per the time interval');
                _this.loadPolygons();
            }
        }, 3600000);
    };
    return PolygonsLoader;
}());
exports.default = new PolygonsLoader();
//# sourceMappingURL=PolygonsLoader.js.map