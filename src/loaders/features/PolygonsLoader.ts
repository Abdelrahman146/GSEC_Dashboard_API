// /src/loaders/PolygonsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import urls from '../../configuration';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class PolygonsLoader {

    private polygons: any[];
    //private polygonsUrl = 'https://almeydan.ecouncil.ae/arcgis/rest/services/gsec_application/polygons/FeatureServer/2';
    private polygonsUrl: string = urls.PROJECTS_MAP_DASHBOARD_POLY_PRO;


    constructor() {
        this.polygons = [];
        console.log("PolygonsLoader: initiated");
        this.loadPolygons();
    }

    // fetch all polygons from the server to the object
    public loadPolygons() {
        let that = this
        queryFeatures({
            url: this.polygonsUrl,
            where: `1=1`
        })
        .then((results: any) => {
            this.polygons = results.features;
            console.log(`PolygonsLoader: successfully retrieved ${this.polygons.length} objects`);
        }).catch((err) => {
            console.error(`polygonsLoader: error: ${err}`)
        });
    }

    // get all polygons from polygons object
    public getAllPolygons(): any {
        return this.polygons;
    }

}

export default new PolygonsLoader();