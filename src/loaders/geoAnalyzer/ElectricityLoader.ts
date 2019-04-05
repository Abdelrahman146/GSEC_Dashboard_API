// /src/loaders/geoanalyzer/ElectricityLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import log from '../Debug';
import urls from '../../configuration';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class ElectricityLoader {

    private electricityConsumption: any[];
    private electricityConsumptionUrl: string = urls.GEO_ANALYZER_ELECTRIC_CONSUMPTION_PRO;


    constructor() {
        this.electricityConsumption = [];
        this.loadElectricity();
        this.reload();
    }

    // fetch all electricityConsumption from the server to the object
    public loadElectricity() {
        let that = this
        queryFeatures({
            url: this.electricityConsumptionUrl,
            where: `1=1`
        })
        .then((results: any) => {
            this.electricityConsumption = results.features;
            console.log(`ElectricityLoader: retrieved ${this.electricityConsumption.length} object`);
            log.msg('info', 'ElectricityLoader', `retrieved ${this.electricityConsumption.length} object`);
        }).catch((err) => {
            console.error(`ElectricityLoader: error: ${err}`);
            log.msg('error', 'ElectricityLoader', `${err}`);
        });
    }

    public getElectricityObject() {
        return this.electricityConsumption;
    }

    // get a specific electricityConsumption by geometry
    public getTotalElectricityConsumptionByGeometry(geometry: any): number {
        let result: number = 0;
        this.electricityConsumption.forEach(element => {
            if(geometry.contains(element.geometry)) {
                result += element.attributes.E_DAILY_CONS_KWH;
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
                log.msg('info', 'ElectricityLoader', 'started to reload as per the time interval');
                this.loadElectricity();
            }
        }, 3600000);
    }

}

export default new ElectricityLoader();