// /src/loaders/PrivateSchoolsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import urls from '../../configuration';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class PrivateSchoolsLoader {

    private privateSchools: any[];
    private privateSchoolsUrl:string = urls.GEO_ANALYZER_PRIVATE_SCHOOLS_PRO;


    constructor() {
        this.privateSchools = [];
        console.log("PrivateSchoolsLoader: initiated");
        this.loadPrivateSchools();
    }

    // fetch all privateSchools from the server to the object
    public loadPrivateSchools() {
        let that = this
        queryFeatures({
            url: this.privateSchoolsUrl,
            where: `1=1`
        })
        .then((results: any) => {
            this.privateSchools = results.features;
            console.log(`PrivateSchoolsLoader: successfully retrieved ${this.privateSchools.length} schools`);
        }).catch((err) => {
            console.error(`PrivateSchoolsLoader: error: ${err}`);
        });
    }

    // get all privateSchools from privateSchools object
    public getAllPrivateSchools(): any {
        return this.privateSchools;
    }

    // // get a specific privateSchools by geometry
    // public getPrivateSchoolsByGeometry(geometry: any): any {
    //     let result: any = [];
    //     this.privateSchools.forEach(element => {
    //         if(geometry.contains(element.geometry)) {
    //             result.push(element);
    //         }
    //     });
    //     return result;
    // }

}

export default new PrivateSchoolsLoader();