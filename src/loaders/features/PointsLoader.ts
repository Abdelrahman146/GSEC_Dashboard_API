// /src/loaders/features/PointsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import log from '../Debug';
import urls from '../../configuration';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class PointsLoader {

    private points: any[];
    private pointsUrl: string = urls.PROJECTS_MAP_DASHBOARD_POINTS_PRO;

    constructor() {
        this.points = [];
        this.loadPoints();
        this.reload();
    }

    // fetch all points from the server to the object
    public loadPoints() {
        let that = this
        queryFeatures({
            url: this.pointsUrl,
            where: `1=1`
        })
        .then((results: any) => {
            this.points = results.features;
            console.log(`PointsLoader: successfully retrieved ${this.points.length} objects`);
        }).catch((err) => {
            console.error(`error: ${err}`);
            log.msg('error', 'PointsLoader', `${err}`);
        });
    }

    // get all points from points object
    public getAllPoints(): any {
        return this.points;
    }

    private reload(): any {
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(()=> {
            let hour = new Date().getHours();
            if (hour == 1) {
                log.msg('info', 'PointsLoader', 'Projects has started to reload as per the time interval');
                this.loadPoints();
            }
        }, 3600000);
    }

}

export default new PointsLoader();