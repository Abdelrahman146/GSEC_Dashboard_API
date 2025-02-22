// /src/controllers/geoAnalyzer/FeaturesController.ts
import log from '../loaders/Debug';
import PointsLoader from '../loaders/features/PointsLoader';
import LinesLoader from '../loaders/features/LinesLoader';
import PolygonsLoader from '../loaders/features/PolygonsLoader';
import { Request, Response } from 'express';

class FeaturesController {

    constructor() {
        console.log("FeaturesController: has started");
        log.msg('info','FeaturesController', 'instance has started');
    }

    // reload points object
    public async loadPoints( req: Request, res: Response) {
        try {
            await PointsLoader.loadPoints();
            res.send("FeaturesController: pointsObject has reloaded");
            console.log("FeaturesController: pointsObject has reloaded");
            log.msg('info', 'FeaturesController', `pointsObject has reloaded`);
        }catch(err) {
            res.send(`FeaturesController: an error occured: ${err}`);
            console.log(`FeaturesController: an error occured: ${err}`);
            log.msg('error', 'FeaturesController', `${err}`);

        }
    }

    // reload Lines object
    public async loadLines( req: Request, res: Response) {
        try {
            await LinesLoader.loadLines();
            res.send("FeaturesController: LinesObject has reloaded");
            console.log("FeaturesController: LinesObject has reloaded");
            log.msg('info', 'FeaturesController', `LinesObject has reloaded`);
        }catch(err) {
            res.send(`FeaturesController: an error occured: ${err}`);
            console.log(`FeaturesController: an error occured: ${err}`);
            log.msg('error', 'FeaturesController', `${err}`);

        }
    }

    // reload polygons object
    public async loadPolygons( req: Request, res: Response) {
        try {
            await PolygonsLoader.loadPolygons();
            res.send("FeaturesController: polygonsObject has reloaded");
            console.log("FeaturesController: polygonsObject has reloaded");
            log.msg('info', 'FeaturesController', `polygonsObject has reloaded`);
        }catch(err) {
            res.send(`FeaturesController: an error occured: ${err}`);
            console.log(`FeaturesController: an error occured: ${err}`);
            log.msg('error', 'FeaturesController', `${err}`);

        }
    }

    // get points object
    public getAllPoints( req: Request, res: Response) {
        try {
            let pointsObject: any = PointsLoader.getAllPoints();
            res.send(pointsObject);
            console.log(`FeaturesController: points object sent`);
            log.msg('info', 'FeaturesController', `points object sent`);
        }catch(err) {
            res.send(`FeaturesController: an error occured: ${err}`);
            console.log(`FeaturesController: an error occured: ${err}`);
            log.msg('error', 'FeaturesController', `${err}`);
        }
    }

    // get lines object
    public getAllLines( req: Request, res: Response) {
        try {
            let linesObject: any = LinesLoader.getAllLines();
            res.send(linesObject);
            console.log(`FeaturesController: lines object sent`);
            log.msg('info', 'FeaturesController', `lines object sent`);
        }catch(err) {
            res.send(`FeaturesController: an error occured: ${err}`);
            console.log(`FeaturesController: an error occured: ${err}`);
            log.msg('error', 'FeaturesController', `${err}`);
        }
    }

    // get polygons object
    public getAllPolygons( req: Request, res: Response) {
        try {
            let polygonsObject: any = PolygonsLoader.getAllPolygons();
            res.send(polygonsObject);
            console.log(`FeaturesController: polygon object sent`);
            log.msg('info', 'FeaturesController', `polygon object sent`);
        }catch(err) {
            res.send(`FeaturesController: an error occured: ${err}`);
            console.log(`FeaturesController: an error occured: ${err}`);
            log.msg('error', 'FeaturesController', `${err}`);
        }
    }
    

}

export default FeaturesController;