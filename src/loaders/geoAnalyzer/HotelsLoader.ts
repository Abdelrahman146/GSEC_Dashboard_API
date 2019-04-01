// /src/loaders/geoanalyzer/HotelsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import urls from '../../configuration';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class HotelsLoader {

    private hotels: any[];
    private hotelsUrl: string = urls.GEO_ANALYZER_HOTELS_PRO;


    constructor() {
        this.hotels = [];
        this.loadHotels();
        this.reload();
    }

    // fetch all hotels from the server to the object
    public loadHotels() {
        let that = this
        queryFeatures({
            url: this.hotelsUrl,
            where: `1=1`
        })
        .then((results: any) => {
            this.hotels = results.features ;
            console.log(`HotelsLoader: successfully retrieved ${this.hotels.length} hotel`)
        }).catch((err) => {
            console.error(`error: ${err}`)
        });
    }

    // get all hotels from hotels object
    public getAllHotels(): any {
        return this.hotels;
    }

    // // get a specific hotels by geometry
    // public getHotelsByGeometry(geometry: any): any {
    //     let result: any = [];
    //     this.hotels.forEach(element => {
    //         if(geometry.contains(element.geometry)) {
    //             result.push(element);
    //         }
    //     });
    //     return result;
    // }

    private reload(): any {
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(this.loadHotels, 86400000);
    }

}

export default new HotelsLoader();