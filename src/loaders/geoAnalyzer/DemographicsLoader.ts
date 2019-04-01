// /src/loaders/geoanalyzer/DemographicsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import urls from '../../configuration';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class DemographicsLoader {

    private demographics: any[];
    private demographicsUrl: string = urls.GEO_ANALYZER_DEMOGRAPHICS_PRO;


    constructor() {
        this.demographics = [];
        this.loadDemographics();
        this.reload();
    }

    // fetch all demographics from the server to the object
    public loadDemographics() {
        let that = this
        queryFeatures({
            url: this.demographicsUrl,
            where: `1=1`
        })
        .then((results: any) => {
            this.demographics = results.features;
            console.log(`DemographicsLoader: retreived ${this.demographics.length} object`)
        }).catch((err) => {
            console.error(`DemographicsLoader: error: ${err}`)
        });
    }

    // get all demographics from demographics object
    public getAllDemographics(): any {
        return this.demographics;
    }

    // // get usual residents by geometry
    // public getTotalUsualResidentsByGeometry(geometry: any): number {
    //     let result: number = 0;
    //     this.demographics.forEach(element => {
    //         if(geometry.contains(element.geometry)) {
    //             result += element.attributes.Usual_Residents;
    //         }
    //     });
    //     return result;
    // }

    // // get citizens by geometry
    // public getTotalCitizensByGeometry(geometry: any): number {
    //     let result: number = 0;
    //     this.demographics.forEach(element => {
    //         if(geometry.contains(element.geometry)) {
    //             result += element.attributes.Citizen;
    //         }
    //     });
    //     return result;
    // }

    // // get non-citizens by geometry
    // public getTotalNonCitizensByGeometry(geometry: any): number {
    //     let result: number = 0;
    //     this.demographics.forEach(element => {
    //         if(geometry.contains(element.geometry)) {
    //             result += element.attributes.Non_Citizen;
    //         }
    //     });
    //     return result;
    // }

    // get female citizens by geometry
    public getTotalFemaleCitizensByGeometry(geometry: any): number {
        let result: number = 0;
        this.demographics.forEach(element => {
            if(geometry.contains(element.geometry)) {
                result += element.attributes.Citizen_Females;
            }
        });
        return result;
    }

    // get male citizens by geometry
    public getTotalMaleCitizensByGeometry(geometry: any): number {
        let result: number = 0;
        this.demographics.forEach(element => {
            if(geometry.contains(element.geometry)) {
                result += element.attributes.Citizen_Males;
            }
        });
        return result;
    }

    private reload(): any {
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(this.loadDemographics, 86400000);
    }

}

export default new DemographicsLoader();