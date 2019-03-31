// /src/loaders/ElectricityLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import urls from '../../configuration';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class ElectricityLoader {

    private electricityConsumption: any[];
    private electricityConsumptionUrl: string = urls.GEO_ANALYZER_ELECTRIC_CONSUMPTION_PRO;


    constructor() {
        this.electricityConsumption = [];
        console.log("ElectricityConsumptionLoader: initiated");
        this.loadElectricity();
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
            console.log(`ElectricityLoader: retrieved ${this.electricityConsumption.length} object`)
        }).catch((err) => {
            console.error(`ElectricityLoader: error: ${err}`)
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

}

export default new ElectricityLoader();