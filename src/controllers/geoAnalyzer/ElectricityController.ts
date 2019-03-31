// /src/controllers/geoAnalyzer/ElectricityController.ts

import ElectricityLoader from '../../loaders/geoAnalyzer/ElectricityLoader';
import { Request, Response } from 'express';

class ElectricityController {

    constructor() {
        console.log("ElectricityController Initiated");
    }

    // load all electricityObject
    public async loadElectricty( req: Request, res: Response) {
        try {
            await ElectricityLoader.loadElectricity();
            res.send("electricityObject has reloaded");
            console.log("electricityObject has reloaded");
        }catch(err) {
            res.send(`an error occured: ${err}`);
            console.log(`an error occured: ${err}`);

        }
    }


    //retrieve total electricity consumption in a specfic geometry
    public getTotalElectricityConsumptionByGeometry( req: Request, res: Response) {
        try {
            let electricityConsumption: number = ElectricityLoader.getTotalElectricityConsumptionByGeometry(req.body);
            res.send(electricityConsumption);
            console.log(`electricityConsumption sent: ${electricityConsumption}`);
        }catch(err) {
            res.send(`an error occured: ${err}`);
            console.log(`an error occured: ${err}`);
        }
    }

}

export default ElectricityController;