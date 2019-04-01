// /src/loaders/features/LinesLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import urls from '../../configuration';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class LinesLoader {

    private lines: any[];
    private linesUrl: string = urls.PROJECTS_MAP_DASHBOARD_LINES_PRO;


    constructor() {
        this.lines = [];
        this.loadLines();
        this.reloadLines();
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

    private reloadLines(): any {
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(this.loadLines, 86400000);
    }

}

export default new LinesLoader();