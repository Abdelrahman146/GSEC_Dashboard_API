// /src/loaders/ProjectsLoader.ts
import Project from '../interfaces/Project';
import urls from '../configuration';
import rp from 'request-promise';

class ProjectsLoader {

    private projects: any[];
    private projectsUrlOptions = {
        uri: 'https://reqres.in/api/users',
        //uri: urls.PROJECTS_API_DASHBOARD_PRO,
        //uri: 'https://almeydan.ecouncil.ae/almeydanapi/api/dashboard',
        json: true
    };


    constructor() {
        this.projects = [];
        console.log("ProjectsLoader initiated");
        this.loadProjects();
    }

    public loadProjects() {
        let that = this
        rp(this.projectsUrlOptions).then(function(p) {
            that.projects = p;
            console.log(`ProjectsLoader: successfully retrieved ${that.projects.length} projects`);
        }).catch(function(err) {
            console.log(`ProjectsLoader: an error occured while retrieving the projects from API... ${err}`);
        }); 
        
    }

    // get all projects from the object
    public getAllProjects(): any {
        return this.projects;
    }

}

export default new ProjectsLoader();