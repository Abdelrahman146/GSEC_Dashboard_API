// /src/loaders/ClinicsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import urls from '../../configuration';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class ClinicsLoader {

    private clinics: any[];
    private clinicsUrl: string = urls.GEO_ANALYZER_CLINICS_PRO;


    constructor() {
        this.clinics = [];
        console.log("ClinicsLoader initiated");
        this.loadClinics();
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
            console.log(`ClinicsLoader: retreived ${this.clinics.length} clinics`)
        }).catch((err) => {
            console.error(`error: ${err}`)
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

}

export default new ClinicsLoader();