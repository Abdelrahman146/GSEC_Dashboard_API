"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/routes/index.ts
var Debug_1 = __importDefault(require("../loaders/Debug"));
var ProjectsController_1 = __importDefault(require("../controllers/ProjectsController"));
var FeaturesController_1 = __importDefault(require("../controllers/FeaturesController"));
var GeoAnalyzerController_1 = __importDefault(require("../controllers/GeoAnalyzerController"));
var Routes = /** @class */ (function () {
    function Routes() {
        this.projectsController = new ProjectsController_1.default();
        this.featuresController = new FeaturesController_1.default();
        this.geoAnalyzerController = new GeoAnalyzerController_1.default();
        console.log("Routes has started");
        Debug_1.default.msg('info', 'Routes', "Routes has started");
    }
    Routes.prototype.routes = function (app) {
        // ===================== Debug [GET] =====================
        app.route('/log').get(function (req, res) {
            try {
                res.json(Debug_1.default.getLog());
                //console.log(log.getLog());
            }
            catch (err) {
                res.send(err);
            }
        });
        // ===================== Projects [reload] =====================
        // reload projects object
        app.route('/projects/load').get(this.projectsController.loadProjects);
        // ===================== Projects [GET] =====================
        // get all projects
        app.route('/projects').get(this.projectsController.getAllProjects);
        // ===================== features [reload] =====================
        // reload polygons object
        app.route('/features/polygons/load').get(this.featuresController.loadPolygons);
        // reload lines object
        app.route('/features/lines/load').get(this.featuresController.loadLines);
        // reload points object
        app.route('/features/points/load').get(this.featuresController.loadPoints);
        // ===================== features [GET] =====================
        // reload polygons object
        app.route('/features/polygons').get(this.featuresController.getAllPolygons);
        // reload lines object
        app.route('/features/lines').get(this.featuresController.getAllLines);
        // reload points object
        app.route('/features/points').get(this.featuresController.getAllPoints);
        // ===================== geoanalyzer [reload] =====================
        // reload demographics object
        app.route('/geoanalyzer/demographics/load').get(this.geoAnalyzerController.loadDemographics);
        // reload electricity object
        app.route('/geoanalyzer/electricity/load').get(this.geoAnalyzerController.loadElectricity);
        // reload water object
        app.route('/geoanalyzer/water/load').get(this.geoAnalyzerController.loadWater);
        // reload hospitals object
        app.route('/geoanalyzer/hospitals/load').get(this.geoAnalyzerController.loadHospitals);
        // reload clinics object
        app.route('/geoanalyzer/clinics/load').get(this.geoAnalyzerController.loadClinics);
        // reload police stations object
        app.route('/geoanalyzer/policestations/load').get(this.geoAnalyzerController.loadPoliceStations);
        // reload civil defence stations object
        app.route('/geoanalyzer/civildefencestations/load').get(this.geoAnalyzerController.loadCivilDefenceStations);
        // reload ambulance stations object
        app.route('/geoanalyzer/ambulancestations/load').get(this.geoAnalyzerController.loadAmbulanceStations);
        // reload private schools object
        app.route('/geoanalyzer/privateschools/load').get(this.geoAnalyzerController.loadPrivateSchools);
        // reload public schools object
        app.route('/geoanalyzer/publicschools/load').get(this.geoAnalyzerController.loadPublicSchools);
        // reload places of worship object
        app.route('/geoanalyzer/placesofworship/load').get(this.geoAnalyzerController.loadPlacesOfWorship);
        // reload hotels object
        app.route('/geoanalyzer/hotels/load').get(this.geoAnalyzerController.loadHotels);
        // reload houses object
        app.route('/geoanalyzer/houses/load').get(this.geoAnalyzerController.loadHouses);
        // reload traffic density object
        app.route('/geoanalyzer/traffic/load').get(this.geoAnalyzerController.loadTraffic);
        // ===================== geoanalyzer [GET] =====================
        app.route('/geoanalyzer/demographics').get(this.geoAnalyzerController.getAllDemographics);
        // get total number of usual residents from demographic object
        // app.route('/geoanalyzer/dempographics/usualresident').get(this.geoAnalyzerController.getTotalUsualResidentsByGeometry);
        // // get total number of citizens from demographic object
        // app.route('/geoanalyzer/dempographics/citizens').get(this.geoAnalyzerController.getTotalCitizensByGeometry);
        // // get total number of non-citizens from demographic object
        // app.route('/geoanalyzer/dempographics/non-citizens').get(this.geoAnalyzerController.getTotalNonCitizensByGeometry);
        // // get total number of male citizens from demographic object
        // app.route('/geoanalyzer/dempographics/male-citizens').get(this.geoAnalyzerController.getTotalMaleCitizensByGeometry);
        // // get total number of female citizens from demographic object
        // app.route('/geoanalyzer/dempographics/female-citizens').get(this.geoAnalyzerController.getTotalFemaleCitizensByGeometry);
        // get total value of electrcity consumption
        app.route('/geoanalyzer/electricity').get(this.geoAnalyzerController.getElectricityObject);
        // get total value of water consumption
        app.route('/geoanalyzer/water').get(this.geoAnalyzerController.getWaterObject);
        // get hospitals
        app.route('/geoanalyzer/hospitals').get(this.geoAnalyzerController.getAllHospitals);
        // get clinics
        app.route('/geoanalyzer/clinics').get(this.geoAnalyzerController.getAllClinics);
        // get police stations
        app.route('/geoanalyzer/policestations').get(this.geoAnalyzerController.getAllPoliceStations);
        // get civil defence stations
        app.route('/geoanalyzer/civildefencestations').get(this.geoAnalyzerController.getAllCivilDefenceStations);
        // get ambulance stations
        app.route('/geoanalyzer/ambulancestations').get(this.geoAnalyzerController.getAllAmbulanceStations);
        // get private schools 
        app.route('/geoanalyzer/privateschools').get(this.geoAnalyzerController.getAllPrivateSchools);
        // get public schools 
        app.route('/geoanalyzer/publicschools').get(this.geoAnalyzerController.getAllPublicSchools);
        // get places of worship
        app.route('/geoanalyzer/placesofworship').get(this.geoAnalyzerController.getAllPlacesOfWorship);
        // get hotels 
        app.route('/geoanalyzer/hotels').get(this.geoAnalyzerController.getAllHotels);
        // get houses 
        app.route('/geoanalyzer/houses').get(this.geoAnalyzerController.getAllHouses);
        // get traffic density 
        app.route('/geoanalyzer/traffic').get(this.geoAnalyzerController.getAllTrafficDensityAreas);
    };
    return Routes;
}());
exports.Routes = Routes;
//# sourceMappingURL=index.js.map