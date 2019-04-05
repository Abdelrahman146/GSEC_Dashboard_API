// /src/loaders/geoanalyzer/HousesLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import log from '../Debug';
import urls from '../../configuration';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class HousesLoader {

    private houses: any[];
    private housesUrl: string = urls.GEO_ANALYZER_HOUSES_PRO;


    constructor() {
        this.houses = [];
        this.loadHouses();
        this.reload();
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
            console.log(`HousesLoader: successfully retrieved ${this.houses.length} houses`);
            log.msg('info', 'HousesLoader', `retrieved ${this.houses.length} houses`);
        }).catch((err) => {
            console.error(`HousesLoader: ${err}`);
            log.msg('error', 'HousesLoader', `${err}`);
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

    private reload(): any {
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(()=> {
            let hour = new Date().getHours();
            if (hour == 8 || hour == 12) {
                log.msg('info', 'HousesLoader', 'started to reload as per the time interval');
                this.loadHouses();
            }
        }, 3600000);
    }

}

export default new HousesLoader();