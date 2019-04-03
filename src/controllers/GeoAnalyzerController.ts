// /src/controllers/geoAnalyzer/GeoAnalyzerController.ts
import log from '../loaders/Debug';
import DemographicsLoader from '../loaders/geoAnalyzer/DemographicsLoader';
import ElectricityLoader from '../loaders/geoAnalyzer/ElectricityLoader';
import WaterLoader from '../loaders/geoAnalyzer/WaterLoader';
import AmbulanceStationsLoader from '../loaders/geoAnalyzer/AmbulanceStationsLoader';
import CivilDefenceStationsLoader from '../loaders/geoAnalyzer/CivilDefenceStationsLoader';
import ClinicsLoader from '../loaders/geoAnalyzer/ClinicsLoader';
import HospitalsLoader from '../loaders/geoAnalyzer/HospitalsLoader';
import HotelsLoader from '../loaders/geoAnalyzer/HotelsLoader';
import HousesLoader from '../loaders/geoAnalyzer/HousesLoader';
import PlacesOfWorshipLoader from '../loaders/geoAnalyzer/PlacesOfWorshipLoader';
import PoliceStationsLoader from '../loaders/geoAnalyzer/PoliceStationsLoader';
import PrivateSchoolsLoader from '../loaders/geoAnalyzer/PrivateSchoolsLoader';
import PublicSchoolsLoader from '../loaders/geoAnalyzer/PublicSchoolsLoader';
import TrafficDensityLoader from '../loaders/geoAnalyzer/TrafficDensityLoader';

import { Request, Response } from 'express';

class GeoAnalyzerController {

    constructor() {
        console.log("GeoAnalyzerController: has started");
        log.msg('info','GeoAnalyzerController', 'instance has started');
    }

    // reload Demographic object
    public async loadDemographics( req: Request, res: Response) {
        try {
            await DemographicsLoader.loadDemographics();
            res.send("GeoAnalyzerController: Demographics has reloaded");
            console.log("GeoAnalyzerController: Demographics has reloaded");
            log.msg('info','GeoAnalyzerController', ' Demographics has reloaded');
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }
    }

    public getAllDemographics(req: Request, res: Response) {
        try {
            let result: any = DemographicsLoader.getAllDemographics();
            res.send(result);
            console.log(`GeoAnalyzerController: demographics sent:`);
            log.msg('info','GeoAnalyzerController', `demographics sent:`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }
    }

    // // get usual residents by geometry
    // public getTotalUsualResidentsByGeometry(req: Request, res: Response) {
    //     try {
    //         let total: number = DemographicsLoader.getTotalUsualResidentsByGeometry(req.body);
    //         res.send(total);
    //         console.log(`total number of usual residents sent: ${total}`);
    //     }catch(err) {
    //         res.send(`an error occured: ${err}`);
    //         console.log(`an error occured: ${err}`);
    //     }
    // }

    // // get citizens by geometry
    // public getTotalCitizensByGeometry(req: Request, res: Response) {
    //     try {
    //         let total: number = DemographicsLoader.getTotalCitizensByGeometry(req.body);
    //         res.send(total);
    //         console.log(`total number of citizens sent: ${total}`);
    //     }catch(err) {
    //         res.send(`an error occured: ${err}`);
    //         console.log(`an error occured: ${err}`);
    //     }
    // }

    // // get non-citizens by geometry
    // public getTotalNonCitizensByGeometry(req: Request, res: Response) {
    //     try {
    //         let total: number = DemographicsLoader.getTotalNonCitizensByGeometry(req.body);
    //         res.send(total);
    //         console.log(`total number of non citizens sent: ${total}`);
    //     }catch(err) {
    //         res.send(`an error occured: ${err}`);
    //         console.log(`an error occured: ${err}`);
    //     }
    // }

    // // get female citizens by geometry
    // public getTotalFemaleCitizensByGeometry(req: Request, res: Response) {
    //     try {
    //         let total: number = DemographicsLoader.getTotalFemaleCitizensByGeometry(req.body);
    //         res.send(total);
    //         console.log(`total number of female citizens sent: ${total}`);
    //     }catch(err) {
    //         res.send(`an error occured: ${err}`);
    //         console.log(`an error occured: ${err}`);
    //     }        
    // }

    // // get male citizens by geometry
    // public getTotalMaleCitizensByGeometry(req: Request, res: Response) {
    //     try {
    //         let total: number = DemographicsLoader.getTotalMaleCitizensByGeometry(req.body);
    //         res.send(total);
    //         console.log(`total number of male citizens sent: ${total}`);
    //     }catch(err) {
    //         res.send(`an error occured: ${err}`);
    //         console.log(`an error occured: ${err}`);
    //     }        
    // }

    // reload Water object
    public async loadWater( req: Request, res: Response) {
        try {
            await WaterLoader.loadWater();
            res.send("GeoAnalyzerController: Water has reloaded");
            console.log("GeoAnalyzerController: Water has reloaded");
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }
    }

    // get total water consumption by geometry
    public getWaterObject(req: Request, res: Response) {
        try {
            let result: any = WaterLoader.getWaterObject();
            res.send(result);
            console.log(`GeoAnalyzerController: water consumption sent`);
            log.msg('info','GeoAnalyzerController', `water consumption sent`);
            log.msg('info','GeoAnalyzerController', `water consumption sent`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }        
    }

    // reload Electricity object
    public async loadElectricity( req: Request, res: Response) {
        try {
            await ElectricityLoader.loadElectricity();
            res.send("GeoAnalyzerController: Electricity has reloaded");
            console.log("GeoAnalyzerController: Electricity has reloaded");
            log.msg('info','GeoAnalyzerController', `Electricity has reloaded`);
            
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }
    }

    // get total electricity consumption by geometry
    public getElectricityObject(req: Request, res: Response) {
        try {
            let result: any = ElectricityLoader.getElectricityObject();
            res.send(result);
            console.log(`GeoAnalyzerController: electricity consumption sent`);
            log.msg('info','GeoAnalyzerController', `electricity consumption sent`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }        
    }

    // reload hospitals object
    public async loadHospitals( req: Request, res: Response) {
        try {
            await HospitalsLoader.loadHospitals();
            res.send("GeoAnalyzerController: Hospitals has reloaded");
            console.log("GeoAnalyzerController: Hospitals has reloaded");
            log.msg('info','GeoAnalyzerController', `Hospitals has reloaded`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }
    }

    // get hospitals by geometry
    public getAllHospitals(req: Request, res: Response) {
        try {
            let result: any = HospitalsLoader.getAllHospitals();
            res.send(result);
            console.log(`GeoAnalyzerController: hospitals sent`);
            log.msg('info','GeoAnalyzerController', `hospitals sent`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }        
    }

    // reload clinics object
    public async loadClinics( req: Request, res: Response) {
        try {
            await ClinicsLoader.loadClinics();
            res.send("GeoAnalyzerController: Clinics has reloaded");
            console.log("GeoAnalyzerController: Clinics has reloaded");
            log.msg('info','GeoAnalyzerController', `Clinics has reloaded`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }
    }

    // get clinics by geometry
    public getAllClinics(req: Request, res: Response) {
        try {
            let result: any = ClinicsLoader.getAllClinics();
            res.send(result);
            console.log(`GeoAnalyzerController: clinics sent`);
            log.msg('info','GeoAnalyzerController', `clinics sent`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }        
    }

    // reload Police Stations object
    public async loadPoliceStations( req: Request, res: Response) {
        try {
            await PoliceStationsLoader.loadPoliceStations();
            res.send("GeoAnalyzerController: PoliceStations has reloaded");
            console.log("GeoAnalyzerController: PoliceStations has reloaded");
            log.msg('info','GeoAnalyzerController', `PoliceStations has reloaded`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }
    }

    // get police stations by geometry
    public getAllPoliceStations(req: Request, res: Response) {
        try {
            let result: any = PoliceStationsLoader.getAllPoliceStations();
            res.send(result);
            console.log(`GeoAnalyzerController: PoliceStations sent`);
            log.msg('info','GeoAnalyzerController', `PoliceStations sent`);
        }catch(err) {
            res.send(`GeoAnalyzerController: n error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }        
    }
    
    // reload CivilDefence Stations object
    public async loadCivilDefenceStations( req: Request, res: Response) {
        try {
            await CivilDefenceStationsLoader.loadCivilDefenceStations();
            res.send("GeoAnalyzerController: CivilDefence has reloaded");
            console.log("GeoAnalyzerController: CivilDefence has reloaded");
            log.msg('info','GeoAnalyzerController', `CivilDefence has reloaded`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }
    }

    // get CivilDefence by geometry
    public getAllCivilDefenceStations(req: Request, res: Response) {
        try {
            let result: any = CivilDefenceStationsLoader.getAllCivilDefenceStations();
            res.send(result);
            console.log(`GeoAnalyzerController: CivilDefence Stations sent`);
            log.msg('info','GeoAnalyzerController', `CivilDefence Stations sent`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }        
    }

    // reload Ambulance Stations object
    public async loadAmbulanceStations( req: Request, res: Response) {
        try {
            await AmbulanceStationsLoader.loadAmbulanceStations();
            res.send("GeoAnalyzerController: AmbulanceStations has reloaded");
            console.log("GeoAnalyzerController: AmbulanceStations has reloaded");
            log.msg('info','GeoAnalyzerController', `AmbulanceStations has reloaded`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController:  an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }
    }

    // get Ambulance by geometry
    public getAllAmbulanceStations(req: Request, res: Response) {
        try {
            let result: any = AmbulanceStationsLoader.getAllAmbulanceStations();
            res.send(result);
            console.log(`GeoAnalyzerController: Ambulance Stations sent`);
            log.msg('info','GeoAnalyzerController', `Ambulance Stations sent`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }        
    }

    // reload PrivateSchools object
    public async loadPrivateSchools( req: Request, res: Response) {
        try {
            await PrivateSchoolsLoader.loadPrivateSchools();
            res.send("GeoAnalyzerController: PrivateSchools has reloaded");
            console.log("GeoAnalyzerController: PrivateSchools has reloaded");
            log.msg('info','GeoAnalyzerController', `PrivateSchools has reloadedt`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }
    }

    // get PrivateSchools by geometry
    public getAllPrivateSchools(req: Request, res: Response) {
        try {
            let result: any = PrivateSchoolsLoader.getAllPrivateSchools();
            res.send(result);
            console.log(`GeoAnalyzerController: PrivateSchools sent`);
            log.msg('info','GeoAnalyzerController', `PrivateSchools sent`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }        
    }

    // reload PublicSchools object
    public async loadPublicSchools( req: Request, res: Response) {
        try {
            await PublicSchoolsLoader.loadPublicSchools();
            res.send("GeoAnalyzerController: PublicSchools has reloaded");
            console.log("GeoAnalyzerController: PublicSchools has reloaded");
            log.msg('info','GeoAnalyzerController', `PublicSchools has reloaded`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }
    }

    // get PublicSchools by geometry
    public getAllPublicSchools(req: Request, res: Response) {
        try {
            let result: any = PublicSchoolsLoader.getAllPublicSchools();
            res.send(result);
            console.log(`GeoAnalyzerController: PublicSchools sent`);
            log.msg('info','GeoAnalyzerController', `PublicSchools sent`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }        
    }

    // reload PlacesOfWorship object
    public async loadPlacesOfWorship( req: Request, res: Response) {
        try {
            await PlacesOfWorshipLoader.loadPlacesOfWorship();
            res.send("GeoAnalyzerController: PlacesOfWorship has reloaded");
            console.log("GeoAnalyzerController: PlacesOfWorship has reloaded");
            log.msg('info','GeoAnalyzerController', `PlacesOfWorship has reloaded`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }
    }

    // get PlacesOfWorship by geometry
    public getAllPlacesOfWorship(req: Request, res: Response) {
        try {
            let result: any = PlacesOfWorshipLoader.getAllPlacesOfWorship();
            res.send(result);
            console.log(`GeoAnalyzerController: PlacesOfWorship sent`);
            log.msg('info','GeoAnalyzerController', `PlacesOfWorship sent`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }        
    }

    // reload Hotels object
    public async loadHotels( req: Request, res: Response) {
        try {
            await HotelsLoader.loadHotels();
            res.send("GeoAnalyzerController: Hotels has reloaded");
            console.log("GeoAnalyzerController: Hotels has reloaded");
            log.msg('info','GeoAnalyzerController', `Hotels has reloaded`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }
    }

    // get Hotels by geometry
    public getAllHotels(req: Request, res: Response) {
        try {
            let result: any = HotelsLoader.getAllHotels();
            res.send(result);
            console.log(`GeoAnalyzerController: Hotels sent`);
            log.msg('info','GeoAnalyzerController', `Hotels sent`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }        
    }

    // reload Houses object
    public async loadHouses( req: Request, res: Response) {
        try {
            await HousesLoader.loadHouses();
            res.send("GeoAnalyzerController: Houses has reloaded");
            console.log("GeoAnalyzerController: Houses has reloaded");
            log.msg('info','GeoAnalyzerController', `Houses has reloaded`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }
    }

    // get Houses by geometry
    public getAllHouses(req: Request, res: Response) {
        try {
            let result: any = HousesLoader.getAllHouses();
            res.send(result);
            console.log(`GeoAnalyzerController: Houses sent`);
            log.msg('info','GeoAnalyzerController', `Houses sent`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }        
    }

    // reload Traffic object
    public async loadTraffic( req: Request, res: Response) {
        try {
            await TrafficDensityLoader.loadTrafficDensityAreas();
            res.send("GeoAnalyzerController: Traffic has reloaded");
            console.log("GeoAnalyzerController: Traffic has reloaded");
            log.msg('info','GeoAnalyzerController', `Traffic has reloaded`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }
    }

    // get Traffic by geometry
    public getAllTrafficDensityAreas(req: Request, res: Response) {
        try {
            let result: any = TrafficDensityLoader.getAllTrafficDensityAreas();
            res.send(result);
            console.log(`GeoAnalyzerController: Traffic sent`);
            log.msg('info','GeoAnalyzerController', `Traffic sent`);
        }catch(err) {
            res.send(`GeoAnalyzerController: an error occured: ${err}`);
            console.log(`GeoAnalyzerController: an error occured: ${err}`);
            log.msg('error','GeoAnalyzerController', `${err}`);
        }        
    }

}

export default GeoAnalyzerController;