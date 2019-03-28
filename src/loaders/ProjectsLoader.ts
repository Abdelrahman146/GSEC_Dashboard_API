// /src/loaders/projectsLoader.ts

import Project from '../interfaces/Project';
import rp from 'request-promise';
//import query from 'array-query';

class ProjectsLoader {

    private projects: any[];
    private projectsUrlOptions = {
        method: 'POST',
        uri: 'https://almeydan.ecouncil.ae/almeydanapi/api/dashboard',
        body: {
            some: 'payload'
        },
        json: true
    };
    // private projectsUrlOptions = {
    //     uri: 'https://reqres.in/api/users',
    //     json: true
    // };


    constructor() {
        this.projects = [];
        console.log("ProjectsLoader initiated");
        this.loadProjects();
    }

    public loadProjects() {
        let that = this
        rp(this.projectsUrlOptions).then(function(p) {
            console.log(`successfully retrieved ${p.data.length} projects`);
            that.projects = p.data;
        }).catch(function(err) {
            console.log(`an error occured while retrieving the projects from API... ${err}`);
        }); 
    }

    // get all projects from the object
    public getAllProjects(): any {
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