// /src/loaders/projectsLoader.ts

import Project from '../interfaces/Project';
import rp from 'request-promise';
//import query from 'array-query';

class ProjectsLoader {

    private projects: Project[];
    private projectsUrlOptions = {
        method: 'POST',
        uri: 'https://almeydan.ecouncil.ae/almeydanapi/api/dashboard',
        body: {
            some: 'payload'
        },
        json: true
    };


    constructor() {
        this.projects = this.fetchProjects();
    }

    public fetchProjects(): any {
        let projects: Project[];
        rp(this.projectsUrlOptions).then(function(p) {
            console.log(`successfully retrieved ${p.length} projects`);
            projects = p;
            return projects;
        }).catch(function(err) {
            console.log(`an error occured while retrieving the projects from API... ${err}`);
        });  
    }

    public loadProjects(): void {
        this.projects = this.fetchProjects();
    }

    // get all projects from the object
    public getAllProjects(): Project[] {
        return this.projects;
    }

    // // get a specific project from object
    // public getProjectById(projectId: string): Project {
    //     let project: Project;
    //     project = query('projectId').is(projectId).on(this.projects);
    //     return project;
    // }

}

export default new ProjectsLoader();