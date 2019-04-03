// /src/controllers/ProjectsController.ts
import log from '../loaders/Debug';
import projectsLoader from '../loaders/ProjectsLoader';
import { Request, Response } from 'express';

class ProjectsController {

    constructor() {
        console.log("ProjectsController: has started");
        log.msg('info','ProjectsController', 'instance has started');
    }

    // load all projects
    public async loadProjects( req: Request, res: Response) {
        try {
            await projectsLoader.loadProjects();
            res.send("ProjectsController: projects has been loaded");
            console.log("ProjectsController: projects has reloaded");
            log.msg('info', 'ProjectsController', `projects has reloaded`);
        }catch(err) {
            res.send(`ProjectsController: an error occured: ${err}`);
            console.log("ProjectsController: projects has reloaded");
            log.msg('error', 'ProjectsController', `${err}`);

        }
    }


    //retrieve all projects
    public getAllProjects( req: Request, res: Response) {
        try {
            let projects: any = projectsLoader.getAllProjects();
            res.json(projects);
            console.log(`ProjectsController: projects sent`);
            log.msg('info', 'ProjectsController', `projects sent`);
        }catch(err) {
            res.send(`ProjectsController: an error occured: ${err}`);
            console.log(`ProjectsController: an error occured: ${err}`);
            log.msg('error', 'ProjectsController', `${err}`);
        }
    }

}

export default ProjectsController;