"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/features/LinesLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var configuration_1 = __importDefault(require("../../configuration"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var LinesLoader = /** @class */ (function () {
    function LinesLoader() {
        this.linesUrl = configuration_1.default.PROJECTS_MAP_DASHBOARD_LINES_PRO;
        this.lines = [];
        this.loadLines();
        this.reloadLines();
    }
    // fetch all lines from the server to the object
    LinesLoader.prototype.loadLines = function () {
        var _this = this;
        var that = this;
        arcgis_rest_feature_service_1.queryFeatures({
            url: this.linesUrl,
            where: "1=1"
        })
            .then(function (results) {
            _this.lines = results.features;
            console.log("LinesLoader: successfully retrieved " + _this.lines.length + " objects");
        }).catch(function (err) {
            console.error("LinesLoader: error: " + err);
        });
    };
    // get all lines from lines object
    LinesLoader.prototype.getAllLines = function () {
        return this.lines;
    };
    LinesLoader.prototype.reloadLines = function () {
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(this.loadLines, 86400000);
    };
    return LinesLoader;
}());
exports.default = new LinesLoader();
//# sourceMappingURL=LinesLoader.js.map