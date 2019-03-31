// /src/controllers/geoAnalyzer/ElectricityController.ts

import PointsLoader from '../loaders/features/PointsLoader';
import LinesLoader from '../loaders/features/LinesLoader';
import PolygonsLoader from '../loaders/features/PolygonsLoader';
import { Request, Response } from 'express';

class FeaturesController {

    constructor() {
        console.log("FeaturesController Initiated");
    }

    // reload points object
    public async loadPoints( req: Request, res: Response) {
        try {
            await PointsLoader.loadPoints();
            res.send("pointsObject has reloaded");
            console.log("pointsObject has reloaded");
        }catch(err) {
            res.send(`an error occured: ${err}`);
            console.log(`an error occured: ${err}`);

        }
    }

    // reload Lines object
    public async loadLines( req: Request, res: Response) {
        try {
            await LinesLoader.loadLines();
            res.send("LinesObject has reloaded");
            console.log("LinesObject has reloaded");
        }catch(err) {
            res.send(`an error occured: ${err}`);
            console.log(`an error occured: ${err}`);

        }
    }

    // reload polygons object
    public async loadPolygons( req: Request, res: Response) {
        try {
            await PolygonsLoader.loadPolygons();
            res.send("polygonsObject has reloaded");
            console.log("polygonsObject has reloaded");
        }catch(err) {
            res.send(`an error occured: ${err}`);
            console.log(`an error occured: ${err}`);

        }
    }

    // get points object
    public getAllPoints( req: Request, res: Response) {
        try {
            let pointsObject: any = PointsLoader.getAllPoints();
            res.send(pointsObject);
            console.log(`points object sent: ${JSON.stringify(pointsObject)}`);
        }catch(err) {
            res.send(`an error occured: ${err}`);
            console.log(`an error occured: ${err}`);
        }
    }

    // get lines object
    public getAllLines( req: Request, res: Response) {
        try {
            let linesObject: any = LinesLoader.getAllLines();
            res.send(linesObject);
            console.log(`lines object sent: ${JSON.stringify(linesObject)}`);
        }catch(err) {
            res.send(`an error occured: ${err}`);
            console.log(`an error occured: ${err}`);
        }
    }

    // get polygons object
    public getAllPolygons( req: Request, res: Response) {
        try {
            let polygonsObject: any = PolygonsLoader.getAllPolygons();
            res.send(polygonsObject);
            console.log(`polygon object sent: ${JSON.stringify(polygonsObject)}`);
        }catch(err) {
            res.send(`an error occured: ${err}`);
            console.log(`an error occured: ${err}`);
        }
    }
    

}

export default FeaturesController;