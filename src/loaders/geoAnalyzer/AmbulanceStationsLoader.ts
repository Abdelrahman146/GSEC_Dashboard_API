// /src/loaders/geoanalyzer/AmbulanceStationsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import urls from '../../configuration';
import log from '../Debug';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class AmbulanceStationsLoader {

    private ambulanceStations: any[];
    private ambulanceStationsUrl: string = urls.GEO_ANALYZER_AMBULANCE_STATIONS_PRO;


    constructor() {
        this.ambulanceStations = [];
        this.loadAmbulanceStations();
        this.reload();
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
            log.msg('info', 'AmbulanceStationsLoader', `retrieved ${this.ambulanceStations.length} objects`);
        }).catch((err) => {
            console.error(`AmbulanceStationsLoader: error: ${err}`);
            log.msg('error', 'AmbulanceStationsLoader', `${err}`);
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

    private reload(): any {
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(()=> {
            let hour = new Date().getHours();
            if (hour == 1) {
                log.msg('info', 'AmbulanceStationsLoader', 'started to reload as per the time interval');
                this.loadAmbulanceStations();
            }
        }, 3600000);
    }

}

export default new AmbulanceStationsLoader();