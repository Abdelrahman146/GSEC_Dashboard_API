// /src/loaders/projectsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import Project from '../interfaces/Project';
import rp from 'request-promise';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';

class ProjectsLoader {

    private projects: any[];
    private projectsUrlOptions = {
        uri: 'https://almeydan.ecouncil.ae/arcgis/rest/services/gsec_application/projects/FeatureServer/2',
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
        // rp(this.projectsUrlOptions).then(function(p) {
        //     console.log(`successfully retrieved ${p.length} projects`);
        //     that.projects = p;
        // }).catch(function(err) {
        //     console.log(`an error occured while retrieving the projects from API... ${err}`);
        // }); 

        queryFeatures({
            url: "https://almeydan.ecouncil.ae/arcgis/rest/services/gsec_application/projects/FeatureServer/2",
            where: "1=1"
          })
        .then((results: any) => {
            this.projects.push(results.features);
            console.log(`result: ${JSON.stringify(this.projects)}`)
        }).catch((err) => {
            console.error(`error: ${err}`)
        });

        // loadModules([
        //     "esri/tasks/QueryTask",
        //     "esri/tasks/support/Query"
        // ]).then( ([QueryTask, Query]) => {
        //     let polygonsLayerUrl = "https://almeydan.ecouncil.ae/arcgis/rest/services/gsec_application/projects/FeatureServer/2";

        //     let queryTask = new QueryTask({
        //         url: polygonsLayerUrl
        //       });

        //     const query = new Query();
        //     query.returnGeometry = true;
        //     query.outFields = ["*"];
        //     query.where = "project_id = 'N-11611'";
        //     queryTask.execute(query).then(function(results: any){
        //         that.projects.push(results.features);
        //         console.log("added point in project: N-11611");
        //     });

        //     //  // get polygons
        //     //  const query_polygons1 = featureLayer_Polygons.createQuery(); 
        //     //  query_polygons1.where = "project_id = 'N-7733'";
        //     //  query_polygons1.returnGeometry = true;
        //     //  featureLayer_Polygons.queryFeatures(query_polygons).then(function(results: any){
        //     //     that.projects.push(results.features);
        //     //     console.log("added point in project: N-7733");
        //     //  });

        //     //  // get polygons
        //     //  const query_polygons2 = featureLayer_Polygons.createQuery(); 
        //     //  query_polygons2.where = "project_id = 'N-7203'";
        //     //  query_polygons2.returnGeometry = true;
        //     //  featureLayer_Polygons.queryFeatures(query_polygons).then(function(results: any){
        //     //     that.projects.push(results.features);
        //     //     console.log("added point in project: N-7203");
        //     //  });

        // }).catch(err => {
        //     console.error(err);
        // });
        
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