"use strict";
// /src/controllers/geoAnalyzer/GeoAnalyzerController.ts
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
var DemographicsLoader_1 = __importDefault(require("../loaders/geoAnalyzer/DemographicsLoader"));
var ElectricityLoader_1 = __importDefault(require("../loaders/geoAnalyzer/ElectricityLoader"));
var WaterLoader_1 = __importDefault(require("../loaders/geoAnalyzer/WaterLoader"));
var AmbulanceStationsLoader_1 = __importDefault(require("../loaders/geoAnalyzer/AmbulanceStationsLoader"));
var CivilDefenceStationsLoader_1 = __importDefault(require("../loaders/geoAnalyzer/CivilDefenceStationsLoader"));
var ClinicsLoader_1 = __importDefault(require("../loaders/geoAnalyzer/ClinicsLoader"));
var HospitalsLoader_1 = __importDefault(require("../loaders/geoAnalyzer/HospitalsLoader"));
var HotelsLoader_1 = __importDefault(require("../loaders/geoAnalyzer/HotelsLoader"));
var HousesLoader_1 = __importDefault(require("../loaders/geoAnalyzer/HousesLoader"));
var PlacesOfWorshipLoader_1 = __importDefault(require("../loaders/geoAnalyzer/PlacesOfWorshipLoader"));
var PoliceStationsLoader_1 = __importDefault(require("../loaders/geoAnalyzer/PoliceStationsLoader"));
var PrivateSchoolsLoader_1 = __importDefault(require("../loaders/geoAnalyzer/PrivateSchoolsLoader"));
var PublicSchoolsLoader_1 = __importDefault(require("../loaders/geoAnalyzer/PublicSchoolsLoader"));
var TrafficDensityLoader_1 = __importDefault(require("../loaders/geoAnalyzer/TrafficDensityLoader"));
var GeoAnalyzerController = /** @class */ (function () {
    function GeoAnalyzerController() {
        console.log("GeoAnalyzerController: has started");
    }
    // reload Demographic object
    GeoAnalyzerController.prototype.loadDemographics = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, DemographicsLoader_1.default.loadDemographics()];
                    case 1:
                        _a.sent();
                        res.send("GeoAnalyzerController: Demographics has reloaded");
                        console.log("GeoAnalyzerController: Demographics has reloaded");
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        res.send("GeoAnalyzerController: an error occured: " + err_1);
                        console.log("GeoAnalyzerController: an error occured: " + err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GeoAnalyzerController.prototype.getAllDemographics = function (req, res) {
        try {
            var result = DemographicsLoader_1.default.getAllDemographics();
            res.send(result);
            console.log("GeoAnalyzerController: demographics sent: " + result);
        }
        catch (err) {
            res.send("GeoAnalyzerController: an error occured: " + err);
            console.log("GeoAnalyzerController: an error occured: " + err);
        }
    };
    // // get usual residents by geometry
    // public getTotalUsualResidentsByGeometry(req: Request, res: Response) {
    //     try {
    //         let total: number = DemographicsLoader.getTotalUsualResidentsByGeometry(req.body);
    //         res.send(total);
    //         console.log(`total number of usual residents sent: ${total}`);
    //     }catch(err) {
    //         res.send(`an error occured: ${err}`);
    //         console.log(`an error occured: ${err}`);
    //     }
    // }
    // // get citizens by geometry
    // public getTotalCitizensByGeometry(req: Request, res: Response) {
    //     try {
    //         let total: number = DemographicsLoader.getTotalCitizensByGeometry(req.body);
    //         res.send(total);
    //         console.log(`total number of citizens sent: ${total}`);
    //     }catch(err) {
    //         res.send(`an error occured: ${err}`);
    //         console.log(`an error occured: ${err}`);
    //     }
    // }
    // // get non-citizens by geometry
    // public getTotalNonCitizensByGeometry(req: Request, res: Response) {
    //     try {
    //         let total: number = DemographicsLoader.getTotalNonCitizensByGeometry(req.body);
    //         res.send(total);
    //         console.log(`total number of non citizens sent: ${total}`);
    //     }catch(err) {
    //         res.send(`an error occured: ${err}`);
    //         console.log(`an error occured: ${err}`);
    //     }
    // }
    // // get female citizens by geometry
    // public getTotalFemaleCitizensByGeometry(req: Request, res: Response) {
    //     try {
    //         let total: number = DemographicsLoader.getTotalFemaleCitizensByGeometry(req.body);
    //         res.send(total);
    //         console.log(`total number of female citizens sent: ${total}`);
    //     }catch(err) {
    //         res.send(`an error occured: ${err}`);
    //         console.log(`an error occured: ${err}`);
    //     }        
    // }
    // // get male citizens by geometry
    // public getTotalMaleCitizensByGeometry(req: Request, res: Response) {
    //     try {
    //         let total: number = DemographicsLoader.getTotalMaleCitizensByGeometry(req.body);
    //         res.send(total);
    //         console.log(`total number of male citizens sent: ${total}`);
    //     }catch(err) {
    //         res.send(`an error occured: ${err}`);
    //         console.log(`an error occured: ${err}`);
    //     }        
    // }
    // reload Water object
    GeoAnalyzerController.prototype.loadWater = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, WaterLoader_1.default.loadWater()];
                    case 1:
                        _a.sent();
                        res.send("GeoAnalyzerController: Water has reloaded");
                        console.log("GeoAnalyzerController: Water has reloaded");
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        res.send("GeoAnalyzerController: an error occured: " + err_2);
                        console.log("GeoAnalyzerController: an error occured: " + err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // get total water consumption by geometry
    GeoAnalyzerController.prototype.getWaterObject = function (req, res) {
        try {
            var result = WaterLoader_1.default.getWaterObject();
            res.send(result);
            console.log("GeoAnalyzerController: total water consumption sent");
        }
        catch (err) {
            res.send("GeoAnalyzerController: an error occured: " + err);
            console.log("GeoAnalyzerController: an error occured: " + err);
        }
    };
    // reload Electricity object
    GeoAnalyzerController.prototype.loadElectricity = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ElectricityLoader_1.default.loadElectricity()];
                    case 1:
                        _a.sent();
                        res.send("GeoAnalyzerController: Electricity has reloaded");
                        console.log("GeoAnalyzerController: Electricity has reloaded");
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        res.send("GeoAnalyzerController: an error occured: " + err_3);
                        console.log("GeoAnalyzerController: an error occured: " + err_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // get total electricity consumption by geometry
    GeoAnalyzerController.prototype.getElectricityObject = function (req, res) {
        try {
            var result = ElectricityLoader_1.default.getElectricityObject();
            res.send(result);
            console.log("GeoAnalyzerController: total electricity consumption sent");
        }
        catch (err) {
            res.send("GeoAnalyzerController: an error occured: " + err);
            console.log("GeoAnalyzerController: an error occured: " + err);
        }
    };
    // reload hospitals object
    GeoAnalyzerController.prototype.loadHospitals = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, HospitalsLoader_1.default.loadHospitals()];
                    case 1:
                        _a.sent();
                        res.send("GeoAnalyzerController: Hospitals has reloaded");
                        console.log("GeoAnalyzerController: Hospitals has reloaded");
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        res.send("GeoAnalyzerController: an error occured: " + err_4);
                        console.log("GeoAnalyzerController: an error occured: " + err_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // get hospitals by geometry
    GeoAnalyzerController.prototype.getAllHospitals = function (req, res) {
        try {
            var result = HospitalsLoader_1.default.getAllHospitals();
            res.send(result);
            console.log("GeoAnalyzerController: hospitals sent");
        }
        catch (err) {
            res.send("GeoAnalyzerController: an error occured: " + err);
            console.log("GeoAnalyzerController: an error occured: " + err);
        }
    };
    // reload clinics object
    GeoAnalyzerController.prototype.loadClinics = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ClinicsLoader_1.default.loadClinics()];
                    case 1:
                        _a.sent();
                        res.send("GeoAnalyzerController: Clinics has reloaded");
                        console.log("GeoAnalyzerController: Clinics has reloaded");
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        res.send("GeoAnalyzerController: an error occured: " + err_5);
                        console.log("GeoAnalyzerController: an error occured: " + err_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // get clinics by geometry
    GeoAnalyzerController.prototype.getAllClinics = function (req, res) {
        try {
            var result = ClinicsLoader_1.default.getAllClinics();
            res.send(result);
            console.log("GeoAnalyzerController: clinics sent");
        }
        catch (err) {
            res.send("GeoAnalyzerController: an error occured: " + err);
            console.log("GeoAnalyzerController: an error occured: " + err);
        }
    };
    // reload Police Stations object
    GeoAnalyzerController.prototype.loadPoliceStations = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, PoliceStationsLoader_1.default.loadPoliceStations()];
                    case 1:
                        _a.sent();
                        res.send("GeoAnalyzerController: PoliceStations has reloaded");
                        console.log("GeoAnalyzerController: PoliceStations has reloaded");
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        res.send("GeoAnalyzerController: an error occured: " + err_6);
                        console.log("GeoAnalyzerController: an error occured: " + err_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // get police stations by geometry
    GeoAnalyzerController.prototype.getAllPoliceStations = function (req, res) {
        try {
            var result = PoliceStationsLoader_1.default.getAllPoliceStations();
            res.send(result);
            console.log("GeoAnalyzerController: PoliceStations sent");
        }
        catch (err) {
            res.send("GeoAnalyzerController: n error occured: " + err);
            console.log("GeoAnalyzerController: an error occured: " + err);
        }
    };
    // reload CivilDefence Stations object
    GeoAnalyzerController.prototype.loadCivilDefenceStations = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, CivilDefenceStationsLoader_1.default.loadCivilDefenceStations()];
                    case 1:
                        _a.sent();
                        res.send("GeoAnalyzerController: CivilDefence has reloaded");
                        console.log("GeoAnalyzerController: CivilDefence has reloaded");
                        return [3 /*break*/, 3];
                    case 2:
                        err_7 = _a.sent();
                        res.send("GeoAnalyzerController: an error occured: " + err_7);
                        console.log("GeoAnalyzerController: an error occured: " + err_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // get CivilDefence by geometry
    GeoAnalyzerController.prototype.getAllCivilDefenceStations = function (req, res) {
        try {
            var result = CivilDefenceStationsLoader_1.default.getAllCivilDefenceStations();
            res.send(result);
            console.log("GeoAnalyzerController: CivilDefence Stations sent");
        }
        catch (err) {
            res.send("GeoAnalyzerController: an error occured: " + err);
            console.log("GeoAnalyzerController: an error occured: " + err);
        }
    };
    // reload Ambulance Stations object
    GeoAnalyzerController.prototype.loadAmbulanceStations = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, AmbulanceStationsLoader_1.default.loadAmbulanceStations()];
                    case 1:
                        _a.sent();
                        res.send("GeoAnalyzerController: AmbulanceStations has reloaded");
                        console.log("GeoAnalyzerController: AmbulanceStations has reloaded");
                        return [3 /*break*/, 3];
                    case 2:
                        err_8 = _a.sent();
                        res.send("GeoAnalyzerController: an error occured: " + err_8);
                        console.log("GeoAnalyzerController:  an error occured: " + err_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // get Ambulance by geometry
    GeoAnalyzerController.prototype.getAllAmbulanceStations = function (req, res) {
        try {
            var result = AmbulanceStationsLoader_1.default.getAllAmbulanceStations();
            res.send(result);
            console.log("GeoAnalyzerController: Ambulance Stations sent");
        }
        catch (err) {
            res.send("GeoAnalyzerController: an error occured: " + err);
            console.log("an error occured: " + err);
        }
    };
    // reload PrivateSchools object
    GeoAnalyzerController.prototype.loadPrivateSchools = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, PrivateSchoolsLoader_1.default.loadPrivateSchools()];
                    case 1:
                        _a.sent();
                        res.send("GeoAnalyzerController: PrivateSchools has reloaded");
                        console.log("GeoAnalyzerController: PrivateSchools has reloaded");
                        return [3 /*break*/, 3];
                    case 2:
                        err_9 = _a.sent();
                        res.send("GeoAnalyzerController: an error occured: " + err_9);
                        console.log("GeoAnalyzerController: an error occured: " + err_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // get PrivateSchools by geometry
    GeoAnalyzerController.prototype.getAllPrivateSchools = function (req, res) {
        try {
            var result = PrivateSchoolsLoader_1.default.getAllPrivateSchools();
            res.send(result);
            console.log("GeoAnalyzerController: PrivateSchools sent");
        }
        catch (err) {
            res.send("GeoAnalyzerController: an error occured: " + err);
            console.log("GeoAnalyzerController: an error occured: " + err);
        }
    };
    // reload PublicSchools object
    GeoAnalyzerController.prototype.loadPublicSchools = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, PublicSchoolsLoader_1.default.loadPublicSchools()];
                    case 1:
                        _a.sent();
                        res.send("GeoAnalyzerController: PublicSchools has reloaded");
                        console.log("GeoAnalyzerController: PublicSchools has reloaded");
                        return [3 /*break*/, 3];
                    case 2:
                        err_10 = _a.sent();
                        res.send("GeoAnalyzerController: an error occured: " + err_10);
                        console.log("GeoAnalyzerController: an error occured: " + err_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // get PublicSchools by geometry
    GeoAnalyzerController.prototype.getAllPublicSchools = function (req, res) {
        try {
            var result = PublicSchoolsLoader_1.default.getAllPublicSchools();
            res.send(result);
            console.log("GeoAnalyzerController: PublicSchools sent");
        }
        catch (err) {
            res.send("GeoAnalyzerController: an error occured: " + err);
            console.log("GeoAnalyzerController: an error occured: " + err);
        }
    };
    // reload PlacesOfWorship object
    GeoAnalyzerController.prototype.loadPlacesOfWorship = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, PlacesOfWorshipLoader_1.default.loadPlacesOfWorship()];
                    case 1:
                        _a.sent();
                        res.send("GeoAnalyzerController: PlacesOfWorship has reloaded");
                        console.log("GeoAnalyzerController: PlacesOfWorship has reloaded");
                        return [3 /*break*/, 3];
                    case 2:
                        err_11 = _a.sent();
                        res.send("GeoAnalyzerController: an error occured: " + err_11);
                        console.log("GeoAnalyzerController: an error occured: " + err_11);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // get PlacesOfWorship by geometry
    GeoAnalyzerController.prototype.getAllPlacesOfWorship = function (req, res) {
        try {
            var result = PlacesOfWorshipLoader_1.default.getAllPlacesOfWorship();
            res.send(result);
            console.log("GeoAnalyzerController: PlacesOfWorship sent");
        }
        catch (err) {
            res.send("GeoAnalyzerController: an error occured: " + err);
            console.log("GeoAnalyzerController: an error occured: " + err);
        }
    };
    // reload Hotels object
    GeoAnalyzerController.prototype.loadHotels = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, HotelsLoader_1.default.loadHotels()];
                    case 1:
                        _a.sent();
                        res.send("GeoAnalyzerController: Hotels has reloaded");
                        console.log("GeoAnalyzerController: Hotels has reloaded");
                        return [3 /*break*/, 3];
                    case 2:
                        err_12 = _a.sent();
                        res.send("GeoAnalyzerController: an error occured: " + err_12);
                        console.log("GeoAnalyzerController: an error occured: " + err_12);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // get Hotels by geometry
    GeoAnalyzerController.prototype.getAllHotels = function (req, res) {
        try {
            var result = HotelsLoader_1.default.getAllHotels();
            res.send(result);
            console.log("GeoAnalyzerController: Hotels sent");
        }
        catch (err) {
            res.send("GeoAnalyzerController: an error occured: " + err);
            console.log("GeoAnalyzerController: an error occured: " + err);
        }
    };
    // reload Houses object
    GeoAnalyzerController.prototype.loadHouses = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, HousesLoader_1.default.loadHouses()];
                    case 1:
                        _a.sent();
                        res.send("GeoAnalyzerController: Houses has reloaded");
                        console.log("GeoAnalyzerController: Houses has reloaded");
                        return [3 /*break*/, 3];
                    case 2:
                        err_13 = _a.sent();
                        res.send("GeoAnalyzerController: an error occured: " + err_13);
                        console.log("GeoAnalyzerController: an error occured: " + err_13);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // get Houses by geometry
    GeoAnalyzerController.prototype.getAllHouses = function (req, res) {
        try {
            var result = HousesLoader_1.default.getAllHouses();
            res.send(result);
            console.log("GeoAnalyzerController: Houses sent");
        }
        catch (err) {
            res.send("GeoAnalyzerController: an error occured: " + err);
            console.log("GeoAnalyzerController: an error occured: " + err);
        }
    };
    // reload Traffic object
    GeoAnalyzerController.prototype.loadTraffic = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, TrafficDensityLoader_1.default.loadTrafficDensityAreas()];
                    case 1:
                        _a.sent();
                        res.send("GeoAnalyzerController: Traffic has reloaded");
                        console.log("GeoAnalyzerController: Traffic has reloaded");
                        return [3 /*break*/, 3];
                    case 2:
                        err_14 = _a.sent();
                        res.send("GeoAnalyzerController: an error occured: " + err_14);
                        console.log("GeoAnalyzerController: an error occured: " + err_14);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // get Traffic by geometry
    GeoAnalyzerController.prototype.getAllTrafficDensityAreas = function (req, res) {
        try {
            var result = TrafficDensityLoader_1.default.getAllTrafficDensityAreas();
            res.send(result);
            console.log("GeoAnalyzerController: Traffic sent");
        }
        catch (err) {
            res.send("GeoAnalyzerController: an error occured: " + err);
            console.log("GeoAnalyzerController: an error occured: " + err);
        }
    };
    return GeoAnalyzerController;
}());
exports.default = GeoAnalyzerController;
//# sourceMappingURL=GeoAnalyzerController.js.map