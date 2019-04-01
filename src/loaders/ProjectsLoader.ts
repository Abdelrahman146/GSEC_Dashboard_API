// /src/loaders/geoanalyzer/ProjectsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';
import urls from '../configuration';
import rp from 'request-promise';

class ProjectsLoader {

    private projects: any[];
    private projectsUrl= {
        uri: 'http://geoespacial.idom.com:8080/idomdigital/gsec/response/projects.json',
        //uri: urls.PROJECTS_API_DASHBOARD_PRO,
        json: true
    };
    private polygonsUrl: string = urls.PROJECTS_MAP_DASHBOARD_POLY_PRO;
    private linesUrl: string = urls.PROJECTS_MAP_DASHBOARD_LINES_PRO;
    private pointsUrl: string = urls.PROJECTS_MAP_DASHBOARD_POINTS_PRO;



    constructor() {
        this.projects = [];
        this.loadProjects();
        this.reloadProjects();
    }

    public loadProjects() {
        let that = this
        rp(this.projectsUrl).then(function(p) {
            console.log(`ProjectsLoader: successfully retrieved ${p.data.length} projects`);
            that.loadFeatures(p.data);
        }).catch(function(err) {
            console.log(`ProjectsLoader: an error occured while retrieving the projects from API... ${err}`);
        }); 
        
    }

    private loadFeatures(projects: any) {
        console.log('ProjectsLoader: started to load features...');
        let i: number = 0;
        let p: number = 1;
        projects.forEach((project: any) => {
            project.features = {};
            // add polygons
            queryFeatures({
                url: this.polygonsUrl,
                where: `project_id='${project.projectId}'`
            })
            .then((results: any) => {
                //console.log(`ProjectLoader: fetching geometries for project ${p++} / ${projects.length}`);
                project.features.polygons = results.features;
                i++;
                p++;
                if(p == projects.length) {
                    this.projects = projects;
                    console.log(`ProjectsLoader: done fetching ${i} features`)
                    this.calculateMarkersLocation();
                }else if(p == Math.ceil(projects.length*0.5) || p == Math.ceil(projects.length*0.2) || p == Math.ceil(projects.length*0.9) || p == Math.ceil(projects.length*0.7) || p == Math.ceil(projects.length*0.1)){
                    console.log(`ProjectsLoader: fetched: ${p}`);
                }
            }).catch((err) => {
                console.error(`ProjectsLoader: error: ${err}`)
            });

            // add lines
            queryFeatures({
                url: this.linesUrl,
                where: `project_id='${project.projectId}'`
            })
            .then((results: any) => {
                project.features.lines = results.features;
                i++;
            }).catch((err) => {
                console.error(`ProjectsLoader: error: ${err}`)
            });

            // add points
            queryFeatures({
                url: this.pointsUrl,
                where: `project_id='${project.projectId}'`
            })
            .then((results: any) => {
                project.features.points = results.features;
                i++;
            }).catch((err) => {
                console.error(`ProjectsLoader: error: ${err}`)
            });
        });
    }

    private calculateMarkersLocation() {
        console.log(`ProjectsLoader: started calculating projects location`);
        let p: number = 0;
        this.projects.forEach((project: any) => {
            let xmax: number = 0;
            let ymax: number = 0;
            let xmin: number = 100000000000;
            let ymin: number = 100000000000;
            p++;
            try {
                project.features.polygons.forEach((polygon: any) => {
                    polygon.geometry.rings.forEach((ring: any) => {
                        ring.forEach((point: any) => {
                            if(xmax < point[0]){xmax = point[0]}
                            if(xmin > point[0]){xmin = point[0]}
                            if(ymax < point[1]){ymax = point[1]}
                            if(ymin > point[1]){ymin = point[1]}
                        });
                    });
                });
            }catch (err) {
                //console.error(`ProjectLoader error: (polygons) ${p} -  ${err}`);
            }finally {
                try {
                    //console.log(`getting lines for project ${p}`);
                    project.features.lines.forEach((line: any) => {
                        line.geometry.paths.forEach((path: any) => {
                            path.forEach((point: any) => {
                                if(xmax < point[0]){xmax = point[0]}
                                if(xmin > point[0]){xmin = point[0]}
                                if(ymax < point[1]){ymax = point[1]}
                                if(ymin > point[1]){ymin = point[1]}
                            })
                        });
                    });
                }catch (err) {
                    //console.error(`ProjectLoader error: (lines) ${p} - ${err}`);
                }finally {
                    try {
                        //console.log(`getting points for project ${p}`);
                        project.features.points.forEach((p: any) => {
                            if(xmax < p.geometry.x){xmax = p.geometry.x}
                            if(xmin > p.geometry.x){xmin = p.geometry.x}
                            if(ymax < p.geometry.y){ymax = p.geometry.y}
                            if(ymin > p.geometry.y){ymin = p.geometry.y}  
                        });
                    }catch(err) {
                       //console.error(`ProjectLoader error: (points) ${p} - ${err}`);
                    }finally {
                        project.projectLocation = {
                            'xmin': xmin,
                            'ymin': ymin,
                            'xmax': xmax,
                            'ymax': ymax,
                            'xcenter': (xmax+xmin) / 2,
                            'ycenter': (ymax+ymin) / 2
                        };
                    }    
                }
            }
            if(p == this.projects.length){
                console.log(`ProjectsLoader: done calculating locations for ${this.projects.length} project`);
                //console.log(JSON.stringify(this.projects));
            }else if(p == Math.ceil(this.projects.length*0.5) || p == Math.ceil(this.projects.length*0.2) || p == Math.ceil(this.projects.length*0.9) || p == Math.ceil(this.projects.length*0.7) || p == Math.ceil(this.projects.length*0.1)){
                console.log(`ProjectsLoader: calculated: ${p}`);
            }
        }); // end of projects array  
    }

    // get all projects from the object
    public getAllProjects(): any {
        //console.log(`ProjectLoader: requested to get projects ${JSON.stringify(this.projects)}`);
        return this.projects;
    }

    private reloadProjects(): any {
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(this.loadProjects, 86400000);
    }

}

export default new ProjectsLoader();