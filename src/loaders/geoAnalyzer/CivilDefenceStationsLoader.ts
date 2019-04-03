// /src/loaders/geoanalyzer/CivilDefenceStationsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import log from '../Debug';
import urls from '../../configuration';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class CivilDefenceStationsLoader {

    private civilDefenceStations: any[];
    private civilDefenceStationsUrl: string = urls.GEO_ANALYZER_CIVIL_DEFINCE_STATIONS_PRO;


    constructor() {
        this.civilDefenceStations = [];
        this.loadCivilDefenceStations();
        this.reload();
    }

    // fetch all civilDefenceStations from the server to the object
    public loadCivilDefenceStations() {
        let that = this
        queryFeatures({
            url: this.civilDefenceStationsUrl,
            where: `1=1`
        })
        .then((results: any) => {
            this.civilDefenceStations = results.features;
            console.log(`CivilDefenceStationsLoader: retreived ${this.civilDefenceStations.length} stations`);
            log.msg('info', 'CivilDefenceStationsLoader', `CivilDefenceStationsLoader: retreived ${this.civilDefenceStations.length} stations`);
        }).catch((err) => {
            console.error(`error: ${err}`)
            log.msg('error', 'CivilDefenceStationsLoader', `${err}`);
        });
    }

    public getAllCivilDefenceStations() {
        return this.civilDefenceStations;
    }

    // get a specific civilDefenceStations by geometry
    public getCivilDefenceStationsByGeometry(geometry: any): any {
        let result: any = [];
        this.civilDefenceStations.forEach(element => {
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
                log.msg('info', 'CivilDefenceStationsLoader', 'started to reload as per the time interval');
                this.loadCivilDefenceStations();
            }
        }, 3600000);
    }

}

export default new CivilDefenceStationsLoader();