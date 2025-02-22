// /src/loaders/features/PolygonsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import log from '../Debug';
import urls from '../../configuration';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class PolygonsLoader {

    private polygons: any[];
    //private polygonsUrl = 'https://almeydan.ecouncil.ae/arcgis/rest/services/gsec_application/polygons/FeatureServer/2';
    private polygonsUrl: string = urls.PROJECTS_MAP_DASHBOARD_POLY_PRO;


    constructor() {
        this.polygons = [];
        this.loadPolygons();
        this.reload();
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
            log.msg('info', 'PolygonsLoader', `retrieved ${this.polygons.length} objects`);
        }).catch((err) => {
            console.error(`polygonsLoader: error: ${err}`);
            log.msg('error', 'polygonsLoader', `${err}`);
        });
    }

    // get all polygons from polygons object
    public getAllPolygons(): any {
        return this.polygons;
    }

    private reload(): any {
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(()=> {
            let hour = new Date().getHours();
            if (hour == 8 || hour == 12) {
                log.msg('info', 'polygonsLoader', 'Projects has started to reload as per the time interval');
                this.loadPolygons();
            }
        }, 3600000);
    }

}

export default new PolygonsLoader();