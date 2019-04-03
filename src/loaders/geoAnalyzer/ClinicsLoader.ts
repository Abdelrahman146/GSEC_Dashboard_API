// /src/loaders/geoanalyzer/ClinicsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import log from '../Debug';
import urls from '../../configuration';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class ClinicsLoader {

    private clinics: any[];
    private clinicsUrl: string = urls.GEO_ANALYZER_CLINICS_PRO;


    constructor() {
        this.clinics = [];
        this.loadClinics();
        this.reload();
    }

    // fetch all clinics from the server to the object
    public loadClinics() {
        let that = this
        queryFeatures({
            url: this.clinicsUrl,
            where: `1=1`
        })
        .then((results: any) => {
            this.clinics = results.features;
            console.log(`ClinicsLoader: retreived ${this.clinics.length} clinics`);
            log.msg('info', 'ClinicsLoader', `retreived ${this.clinics.length} clinics`);
        }).catch((err) => {
            console.error(`error: ${err}`);
            log.msg('error', 'ClinicsLoader', `${err}`);
        });
    }

    public getAllClinics() {
        return this.clinics;
    }

    // get a specific clinics by geometry
    public getClinicsByGeometry(geometry: any): any {
        let result: any = [];
        this.clinics.forEach(element => {
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
                log.msg('info', 'ClinicsLoader', 'started to reload as per the time interval');
                this.loadClinics();
            }
        }, 3600000);
    }
}

export default new ClinicsLoader();