// /src/loaders/AmbulanceStationsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import urls from '../../configuration';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class AmbulanceStationsLoader {

    private ambulanceStations: any[];
    private ambulanceStationsUrl: string = urls.GEO_ANALYZER_AMBULANCE_STATIONS_PRO;


    constructor() {
        this.ambulanceStations = [];
        console.log("AmbulanceStationsLoader initiated");
        this.loadAmbulanceStations();
    }

    // fetch all ambulanceStations from the server to the object
    public loadAmbulanceStations() {
        let that = this
        queryFeatures({
            url: this.ambulanceStationsUrl,
            where: `1=1`
        })
        .then((results: any) => {
            this.ambulanceStations = results.features;
            console.log(`AmbulanceStationsLoader: successfully retrieved ${this.ambulanceStations.length} objects`);
        }).catch((err) => {
            console.error(`AmbulanceStationsLoader: error: ${err}`)
        });
    }

    public getAllAmbulanceStations() {
        return this.ambulanceStations;
    }

    // get a specific ambulanceStations by geometry
    public getAmbulanceStationsByGeometry(geometry: any): any {
        let result: any = [];
        this.ambulanceStations.forEach(element => {
            if(geometry.contains(element.geometry)) {
                result.push(element);
            }
        });
        return result;
    }

}

export default new AmbulanceStationsLoader();