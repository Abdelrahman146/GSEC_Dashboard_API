// /src/loaders/geoanalyzer/PublicSchoolsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import urls from '../../configuration';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class PublicSchoolsLoader {

    private publicSchools: any[];
    private publicSchoolsUrl: string = urls.GEO_ANALYZER_PUBLIC_SCHOOLS_PRO;


    constructor() {
        this.publicSchools = [];
        this.loadPublicSchools();
        this.reload();
    }

    // fetch all publicSchools from the server to the object
    public loadPublicSchools() {
        let that = this
        queryFeatures({
            url: this.publicSchoolsUrl,
            where: `1=1`
        })
        .then((results: any) => {
            this.publicSchools = results.features;
            console.log(`PublicSchoolsLoader: successfully retrieved ${this.publicSchools.length} schools`);
        }).catch((err) => {
            console.error(`PublicSchoolsLoader: error: ${err}`)
        });
    }

    // get all publicSchools from publicSchools object
    public getAllPublicSchools(): any {
        return this.publicSchools;
    }

    // // get a specific publicSchools by geometry
    // public getPublicSchoolsByGeometry(geometry: any): number {
    //     let result: any = [];
    //     this.publicSchools.forEach(element => {
    //         if(geometry.contains(element.geometry)) {
    //             result.push(element);
    //         }
    //     });
    //     return result;
    // }

    private reload(): any {
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(this.loadPublicSchools, 86400000);
    }

}

export default new PublicSchoolsLoader();