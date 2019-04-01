"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/geoanalyzer/polygonsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var PolygonsLoader = /** @class */ (function () {
    function PolygonsLoader() {
        this.polygonsUrl = 'https://almeydan.ecouncil.ae/arcgis/rest/services/gsec_application/polygons/FeatureServer/2';
        this.polygons = [];
        console.log("PolygonsLoader has started");
        this.loadpolygons();
    }
    // fetch all polygons from the server to the object
    PolygonsLoader.prototype.loadpolygons = function () {
        var _this = this;
        var that = this;
        arcgis_rest_feature_service_1.queryFeatures({
            url: this.polygonsUrl,
            where: "1=1"
        })
            .then(function (results) {
            _this.polygons.push(results.features);
            console.log("result: " + JSON.stringify(_this.polygons));
        }).catch(function (err) {
            console.error("error: " + err);
        });
    };
    // get all polygons from the object
    PolygonsLoader.prototype.getAllpolygons = function () {
        return this.polygons;
    };
    // get a specific Polygon from object
    PolygonsLoader.prototype.getPolygonById = function (PolygonId) {
    };
    return PolygonsLoader;
}());
exports.default = new PolygonsLoader();
//# sourceMappingURL=PolygonsLoader.js.map