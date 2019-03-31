// /src/loaders/PoliceStationsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import urls from '../../configuration';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class PoliceStationsLoader {

    private policeStation: any[];
    private policeStationUrl: string = urls.GEO_ANALYZER_POLICE_STATIONS_PRO;


    constructor() {
        this.policeStation = [];
        console.log("PoliceStationsLoader initiated");
        this.loadPoliceStations();
    }

    // fetch all policeStation from the server to the object
    public loadPoliceStations() {
        let that = this
        queryFeatures({
            url: this.policeStationUrl,
            where: `1=1`
        })
        .then((results: any) => {
            this.policeStation = results.features;
            console.log(`PoliceStationsLoader: successfully retrieved ${this.policeStation.length} stations`);
        }).catch((err) => {
            console.error(`PoliceStationsLoader: error: ${err}`)
        });
    }

    // get all policeStation from policeStation object
    public getAllPoliceStations(): any {
        return this.policeStation;
    }

    // // get a specific policeStation by geometry
    // public getPoliceStationsByGeometry(geometry: any): any {
    //     let result: any = [];
    //     this.policeStation.forEach(element => {
    //         if(geometry.contains(element.geometry)) {
    //             result.push(element);
    //         }
    //     });
    //     return result;
    // }

}

export default new PoliceStationsLoader();