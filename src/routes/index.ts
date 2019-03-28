// /src/routes/index.ts

import ProjectsController from '../controllers/ProjectsController';

export class Routes {

    private projectsController: ProjectsController = new ProjectsController();

    public constructor() {
        console.log("Routes initiated");
    }
    public routes(app: any): void {
        // get all projects
        app.route('/projects/load').get(this.projectsController.loadProjects);
        // get all projects
        app.route('/projects').get(this.projectsController.getAllProjects);
        // get all projects
       // app.route('/projects/:id').get(this.projectsController.getAllProjects);
    }
}