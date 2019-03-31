// /src/loaders/HousesLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import urls from '../../configuration';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class HousesLoader {

    private houses: any[];
    private housesUrl: string = urls.GEO_ANALYZER_HOUSES_PRO;


    constructor() {
        this.houses = [];
        console.log("HousesLoader: initiated");
        this.loadHouses();
    }

    // fetch all houses from the server to the object
    public loadHouses() {
        let that = this
        queryFeatures({
            url: this.housesUrl,
            where: `1=1`
        })
        .then((results: any) => {
            this.houses = results.features;
            console.log(`HousesLoader: successfully retrieved ${this.houses.length} houses`)
        }).catch((err) => {
            console.error(`HousesLoader: ${err}`)
        });
    }

    // get all houses from houses object
    public getAllHouses(): any {
        return this.houses;
    }

    // get a specific houses by geometry
    public getHousesByGeometry(geometry: any): any {
        let result: any = [];
        this.houses.forEach(element => {
            if(geometry.contains(element.geometry)) {
                result.push(element);
            }
        });
        return result;
    }

}

export default new HousesLoader();