// /src/loaders/TrafficDensityAreasLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import urls from '../../configuration';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class TrafficDensityAreasLoader {

    private trafficDensityAreas: any[];
    private trafficDensityAreasUrl: string = urls.HIGH_TRAFFIC_DENSITY_AREAS_PRO;


    constructor() {
        this.trafficDensityAreas = [];
        console.log("TrafficDensityAreasLoader initiated");
        this.loadTrafficDensityAreas();
    }

    // fetch all trafficDensityAreas from the server to the object
    public loadTrafficDensityAreas() {
        let that = this
        queryFeatures({
            url: this.trafficDensityAreasUrl,
            where: `1=1`
        })
        .then((results: any) => {
            this.trafficDensityAreas = results.features;
            console.log(`TrafficDensityAreasLoader: successfully retrieved ${this.trafficDensityAreas.length} object`);
        }).catch((err) => {
            console.error(`TrafficDensityAreasLoader: error: ${err}`)
        });
    }

    // get all trafficDensityAreas from trafficDensityAreas object
    public getAllTrafficDensityAreas(): any {
        return this.trafficDensityAreas;
    }

}

export default new TrafficDensityAreasLoader();