// /src/loaders/geoanalyzer/WaterLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import log from '../Debug';
import urls from '../../configuration';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class WaterLoader {

    private waterConsumption: any[];
    private waterConsumptionUrl: string = urls.GEO_ANALYZER_WATER_CONSUMPTION_PRO;


    constructor() {
        this.waterConsumption = [];
        this.loadWater();
        this.reload();
    }

    // fetch all waterConsumption from the server to the object
    public loadWater() {
        let that = this
        queryFeatures({
            url: this.waterConsumptionUrl,
            where: `1=1`
        })
        .then((results: any) => {
            this.waterConsumption = results.features;
            console.log(`WaterConsumptionLoader: successfully retrieved ${this.waterConsumption.length} object`);
            log.msg('info', 'WaterConsumptionLoader', `retrieved ${this.waterConsumption.length} object`);
        }).catch((err) => {
            console.error(`error: ${err}`);
            log.msg('error', 'WaterConsumptionLoader', `${err}`);
        });
    }

    // get all waterConsumption from waterConsumption object
    public getWaterObject(): any {
        return this.waterConsumption;
    }

    // // get a specific waterConsumption by geometry
    // public getTotalWaterConsumptionByGeometry(geometry: any): number {
    //     let result: number = 0;
    //     this.waterConsumption.forEach(element => {
    //         if(geometry.contains(element.geometry)) {
    //             result += element.attributes.W_DAILY_CONS_M3;
    //         }
    //     });
    //     return result;
    // }

    private reload(): any {
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        // each hour: 3600000 millie seconds
        setInterval(()=> {
            let hour = new Date().getHours();
            if (hour == 1) {
                log.msg('info', 'WaterLoader', 'started to reload as per the time interval');
                this.loadWater();
            }
        }, 3600000);
    }

}

export default new WaterLoader();