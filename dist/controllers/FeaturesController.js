"use strict";
// /src/controllers/geoAnalyzer/ElectricityController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PointsLoader_1 = __importDefault(require("../loaders/features/PointsLoader"));
var LinesLoader_1 = __importDefault(require("../loaders/features/LinesLoader"));
var PolygonsLoader_1 = __importDefault(require("../loaders/features/PolygonsLoader"));
var FeaturesController = /** @class */ (function () {
    function FeaturesController() {
        console.log("FeaturesController Initiated");
    }
    // reload points object
    FeaturesController.prototype.loadPoints = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, PointsLoader_1.default.loadPoints()];
                    case 1:
                        _a.sent();
                        res.send("pointsObject has reloaded");
                        console.log("pointsObject has reloaded");
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        res.send("an error occured: " + err_1);
                        console.log("an error occured: " + err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // reload Lines object
    FeaturesController.prototype.loadLines = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, LinesLoader_1.default.loadLines()];
                    case 1:
                        _a.sent();
                        res.send("LinesObject has reloaded");
                        console.log("LinesObject has reloaded");
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        res.send("an error occured: " + err_2);
                        console.log("an error occured: " + err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // reload polygons object
    FeaturesController.prototype.loadPolygons = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, PolygonsLoader_1.default.loadPolygons()];
                    case 1:
                        _a.sent();
                        res.send("polygonsObject has reloaded");
                        console.log("polygonsObject has reloaded");
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        res.send("an error occured: " + err_3);
                        console.log("an error occured: " + err_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // get points object
    FeaturesController.prototype.getAllPoints = function (req, res) {
        try {
            var pointsObject = PointsLoader_1.default.getAllPoints();
            res.send(pointsObject);
            console.log("points object sent: " + JSON.stringify(pointsObject));
        }
        catch (err) {
            res.send("an error occured: " + err);
            console.log("an error occured: " + err);
        }
    };
    // get lines object
    FeaturesController.prototype.getAllLines = function (req, res) {
        try {
            var linesObject = LinesLoader_1.default.getAllLines();
            res.send(linesObject);
            console.log("lines object sent: " + JSON.stringify(linesObject));
        }
        catch (err) {
            res.send("an error occured: " + err);
            console.log("an error occured: " + err);
        }
    };
    // get polygons object
    FeaturesController.prototype.getAllPolygons = function (req, res) {
        try {
            var polygonsObject = PolygonsLoader_1.default.getAllPolygons();
            res.send(polygonsObject);
            console.log("polygon object sent: " + JSON.stringify(polygonsObject));
        }
        catch (err) {
            res.send("an error occured: " + err);
            console.log("an error occured: " + err);
        }
    };
    return FeaturesController;
}());
exports.default = FeaturesController;
//# sourceMappingURL=FeaturesController.js.map