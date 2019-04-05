"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/features/PointsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var Debug_1 = __importDefault(require("../Debug"));
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var PointsLoader = /** @class */ (function () {
    function PointsLoader() {
        this.pointsUrl = configuration_1.default.PROJECTS_MAP_DASHBOARD_POINTS_PRO;
        this.points = [];
        this.loadPoints();
        this.reload();
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
            Debug_1.default.msg('error', 'PointsLoader', "" + err);
        });
    };
    // get all points from points object
    PointsLoader.prototype.getAllPoints = function () {
        return this.points;
    };
    PointsLoader.prototype.reload = function () {
        var _this = this;
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(function () {
            var hour = new Date().getHours();
            if (hour == 8 || hour == 12) {
                Debug_1.default.msg('info', 'PointsLoader', 'Projects has started to reload as per the time interval');
                _this.loadPoints();
            }
        }, 3600000);
    };
    return PointsLoader;
}());
exports.default = new PointsLoader();
//# sourceMappingURL=PointsLoader.js.map