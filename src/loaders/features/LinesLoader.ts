// /src/loaders/LinesLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import urls from '../../configuration';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class LinesLoader {

    private lines: any[];
    private linesUrl: string = urls.PROJECTS_MAP_DASHBOARD_LINES_PRO;


    constructor() {
        this.lines = [];
        console.log("LinesLoader initiated");
        this.loadLines();
    }

    // fetch all lines from the server to the object
    public loadLines() {
        let that = this
        queryFeatures({
            url: this.linesUrl,
            where: `1=1`
        })
        .then((results: any) => {
            this.lines = results.features;
            console.log(`LinesLoader: successfully retrieved ${this.lines.length} objects`);
        }).catch((err) => {
            console.error(`LinesLoader: error: ${err}`)
        });
    }

    // get all lines from lines object
    public getAllLines(): any {
        return this.lines;
    }

}

export default new LinesLoader();