// /src/routes/index.ts
import log from '../loaders/Debug';
import ProjectsController from '../controllers/ProjectsController';
import FeaturesController from '../controllers/FeaturesController';
import GeoAnalyzerController from '../controllers/GeoAnalyzerController';
import { Request, Response } from 'express';
export class Routes {

    private projectsController: ProjectsController;
    private featuresController: FeaturesController;
    private geoAnalyzerController: GeoAnalyzerController;

    public constructor() {
        this.projectsController = new ProjectsController();
        this.featuresController = new FeaturesController();
        this.geoAnalyzerController = new GeoAnalyzerController();
        console.log("Routes has started");
        log.msg('info', 'Routes', `instance has started`);
    }
    public routes(app: any): void {
        // ===================== Debug [GET] =====================
        app.route('/node/dashboardapi/log').get(function(req: Request, res: Response) {
            try {
                res.json(log.getLog());
                //console.log(log.getLog());
            } catch(err) {
                res.send(err);
            }
        });

        // ===================== Projects [reload] =====================
        
        // reload projects object
        app.route('/node/dashboardapi/projects/load').get(this.projectsController.loadProjects);

        // ===================== Projects [GET] =====================

        // get all projects
        app.route('/node/dashboardapi/projects').get(this.projectsController.getAllProjects);

        // ===================== features [reload] =====================

        // reload polygons object
        app.route('/node/dashboardapi/features/polygons/load').get(this.featuresController.loadPolygons);
        // reload lines object
        app.route('/node/dashboardapi/features/lines/load').get(this.featuresController.loadLines);
        // reload points object
        app.route('/node/dashboardapi/features/points/load').get(this.featuresController.loadPoints);

        // ===================== features [GET] =====================

        // reload polygons object
        app.route('/node/dashboardapi/features/polygons').get(this.featuresController.getAllPolygons);
        // reload lines object
        app.route('/node/dashboardapi/features/lines').get(this.featuresController.getAllLines);
        // reload points object
        app.route('/node/dashboardapi/features/points').get(this.featuresController.getAllPoints);

        // ===================== geoanalyzer [reload] =====================

        // reload demographics object
        app.route('/node/dashboardapi/geoanalyzer/demographics/load').get(this.geoAnalyzerController.loadDemographics);
        // reload electricity object
        app.route('/node/dashboardapi/geoanalyzer/electricity/load').get(this.geoAnalyzerController.loadElectricity);
        // reload water object
        app.route('/node/dashboardapi/geoanalyzer/water/load').get(this.geoAnalyzerController.loadWater);
        // reload hospitals object
        app.route('/node/dashboardapi/geoanalyzer/hospitals/load').get(this.geoAnalyzerController.loadHospitals);
        // reload clinics object
        app.route('/node/dashboardapi/geoanalyzer/clinics/load').get(this.geoAnalyzerController.loadClinics);
        // reload police stations object
        app.route('/node/dashboardapi/geoanalyzer/policestations/load').get(this.geoAnalyzerController.loadPoliceStations);
        // reload civil defence stations object
        app.route('/node/dashboardapi/geoanalyzer/civildefencestations/load').get(this.geoAnalyzerController.loadCivilDefenceStations);
        // reload ambulance stations object
        app.route('/node/dashboardapi/geoanalyzer/ambulancestations/load').get(this.geoAnalyzerController.loadAmbulanceStations);
        // reload private schools object
        app.route('/node/dashboardapi/geoanalyzer/privateschools/load').get(this.geoAnalyzerController.loadPrivateSchools);
        // reload public schools object
        app.route('/node/dashboardapi/geoanalyzer/publicschools/load').get(this.geoAnalyzerController.loadPublicSchools);
        // reload places of worship object
        app.route('/node/dashboardapi/geoanalyzer/placesofworship/load').get(this.geoAnalyzerController.loadPlacesOfWorship);
        // reload hotels object
        app.route('/node/dashboardapi/geoanalyzer/hotels/load').get(this.geoAnalyzerController.loadHotels);
        // reload houses object
        app.route('/node/dashboardapi/geoanalyzer/houses/load').get(this.geoAnalyzerController.loadHouses);
        // reload traffic density object
        app.route('/node/dashboardapi/geoanalyzer/traffic/load').get(this.geoAnalyzerController.loadTraffic);

        // ===================== geoanalyzer [GET] =====================

        app.route('/node/dashboardapi/geoanalyzer/demographics').get(this.geoAnalyzerController.getAllDemographics);
        // get total number of usual residents from demographic object
        // app.route('/node/dashboardapi/geoanalyzer/dempographics/usualresident').get(this.geoAnalyzerController.getTotalUsualResidentsByGeometry);
        // // get total number of citizens from demographic object
        // app.route('/node/dashboardapi/geoanalyzer/dempographics/citizens').get(this.geoAnalyzerController.getTotalCitizensByGeometry);
        // // get total number of non-citizens from demographic object
        // app.route('/node/dashboardapi/geoanalyzer/dempographics/non-citizens').get(this.geoAnalyzerController.getTotalNonCitizensByGeometry);
        // // get total number of male citizens from demographic object
        // app.route('/node/dashboardapi/geoanalyzer/dempographics/male-citizens').get(this.geoAnalyzerController.getTotalMaleCitizensByGeometry);
        // // get total number of female citizens from demographic object
        // app.route('/node/dashboardapi/geoanalyzer/dempographics/female-citizens').get(this.geoAnalyzerController.getTotalFemaleCitizensByGeometry);

        // get total value of electrcity consumption
        app.route('/node/dashboardapi/geoanalyzer/electricity').get(this.geoAnalyzerController.getElectricityObject);
        // get total value of water consumption
        app.route('/node/dashboardapi/geoanalyzer/water').get(this.geoAnalyzerController.getWaterObject);

        // get hospitals
        app.route('/node/dashboardapi/geoanalyzer/hospitals').get(this.geoAnalyzerController.getAllHospitals);
        // get clinics
        app.route('/node/dashboardapi/geoanalyzer/clinics').get(this.geoAnalyzerController.getAllClinics);
        // get police stations
        app.route('/node/dashboardapi/geoanalyzer/policestations').get(this.geoAnalyzerController.getAllPoliceStations);
        // get civil defence stations
        app.route('/node/dashboardapi/geoanalyzer/civildefencestations').get(this.geoAnalyzerController.getAllCivilDefenceStations);
        // get ambulance stations
        app.route('/node/dashboardapi/geoanalyzer/ambulancestations').get(this.geoAnalyzerController.getAllAmbulanceStations);
        // get private schools 
        app.route('/node/dashboardapi/geoanalyzer/privateschools').get(this.geoAnalyzerController.getAllPrivateSchools);
        // get public schools 
        app.route('/node/dashboardapi/geoanalyzer/publicschools').get(this.geoAnalyzerController.getAllPublicSchools);
        // get places of worship
        app.route('/node/dashboardapi/geoanalyzer/placesofworship').get(this.geoAnalyzerController.getAllPlacesOfWorship);
        // get hotels 
        app.route('/node/dashboardapi/geoanalyzer/hotels').get(this.geoAnalyzerController.getAllHotels);
        // get houses 
        app.route('/node/dashboardapi/geoanalyzer/houses').get(this.geoAnalyzerController.getAllHouses);
        // get traffic density 
        app.route('/node/dashboardapi/geoanalyzer/traffic').get(this.geoAnalyzerController.getAllTrafficDensityAreas);

    }
}