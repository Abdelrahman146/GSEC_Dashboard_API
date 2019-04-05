// /src/loaders/geoanalyzer/PlacesOfWorshipLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import log from '../Debug';
import urls from '../../configuration';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class PlacesOfWorshipLoader {

    private placesOfWorship: any[];
    private placesOfWorshipUrl: string = urls.GEO_ANALYZER_PLACES_OF_WORSHIP_PRO;


    constructor() {
        this.placesOfWorship = [];
        this.loadPlacesOfWorship();
        this.reload();
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
            log.msg('info', 'placesOfWorshipLoader', `retrieved ${this.placesOfWorship.length} placesOfWorship`);
        }).catch((err) => {
            console.error(`placesOfWorshipLoader: error: ${err}`);
            log.msg('error', 'placesOfWorshipLoader', `${err}`);
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

    private reload(): any {
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(()=> {
            let hour = new Date().getHours();
            if (hour == 8 || hour == 12) {
                log.msg('info', 'placesOfWorshipLoader', 'started to reload as per the time interval');
                this.loadPlacesOfWorship();
            }
        }, 3600000);
    }

}

export default new PlacesOfWorshipLoader();