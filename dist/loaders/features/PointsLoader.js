"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/PointsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var PointsLoader = /** @class */ (function () {
    function PointsLoader() {
        this.pointsUrl = configuration_1.default.PROJECTS_MAP_DASHBOARD_POINTS_PRO;
        this.points = [];
        console.log("PointsLoader: initiated");
        this.loadPoints();
    }
    // fetch all points from the server to the object
    PointsLoader.prototype.loadPoints = function () {
        var _this = this;
        var that = this;
        arcgis_rest_feature_service_1.queryFeatures({
            url: this.pointsUrl,
            where: "1=1"
        })
            .then(function (results) {
            _this.points = results.features;
            console.log("PointsLoader: successfully retrieved " + _this.points.length + " objects");
        }).catch(function (err) {
            console.error("error: " + err);
        });
    };
    // get all points from points object
    PointsLoader.prototype.getAllPoints = function () {
        return this.points;
    };
    return PointsLoader;
}());
exports.default = new PointsLoader();
//# sourceMappingURL=PointsLoader.js.map