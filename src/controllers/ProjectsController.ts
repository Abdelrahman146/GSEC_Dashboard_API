// /src/controllers/ProjectsController.ts

import Project from '../interfaces/Project';
import projectsLoader from '../loaders/ProjectsLoader';
import { Request, Response } from 'express';

class ProjectsController {

    constructor() {
        console.log("ProjectsController Initiated");
    }

    // load all projects
    public async loadProjects( req: Request, res: Response) {
        try {
            await projectsLoader.loadProjects();
            res.send("projects has been loaded");
            console.log("projects has reloaded");
        }catch(err) {
            res.send(`an error occured: ${err}`);
            console.log("projects has reloaded");

        }
    }


    //retrieve all projects
    public getAllProjects( req: Request, res: Response) {
        try {
            let projects: any = projectsLoader.getAllProjects();
            res.json(projects);
            console.log(`projects sent ${JSON.stringify(projectsLoader.getAllProjects())}`);
        }catch(err) {
            res.send(`an error occured: ${err}`);
            console.log(`an error occured: ${err}`);
        }
    }

}

export default ProjectsController;