// /src/loaders/PlacesOfWorshipLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import urls from '../../configuration';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class PlacesOfWorshipLoader {

    private placesOfWorship: any[];
    private placesOfWorshipUrl: string = urls.GEO_ANALYZER_PLACES_OF_WORSHIP_PRO;


    constructor() {
        this.placesOfWorship = [];
        console.log("PlacesOfWorshipLoader: initiated");
        this.loadPlacesOfWorship();
    }

    // fetch all placesOfWorship from the server to the object
    public loadPlacesOfWorship() {
        let that = this
        queryFeatures({
            url: this.placesOfWorshipUrl,
            where: `1=1`
        })
        .then((results: any) => {
            this.placesOfWorship = results.features;
            console.log(`placesOfWorshipLoader: successfully retrieved ${this.placesOfWorship.length} placesOfWorship`);
        }).catch((err) => {
            console.error(`placesOfWorshipLoader: error: ${err}`)
        });
    }

    public getAllPlacesOfWorship() {
        return this.placesOfWorship;
    }

    // get a specific placesOfWorship by geometry
    public getPlacesOfWorshipByGeometry(geometry: any): any {
        let result: any = [];
        this.placesOfWorship.forEach(element => {
            if(geometry.contains(element.geometry)) {
                result.push(element);
            }
        });
        return result;
    }

}

export default new PlacesOfWorshipLoader();