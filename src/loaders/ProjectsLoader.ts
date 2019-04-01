// /src/loaders/ProjectsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';
import urls from '../configuration';
import rp from 'request-promise';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

class ProjectsLoader {

    private projects: any[];
    private projectsUrl= {
        //uri: 'https://reqres.in/api/users',
        uri: urls.PROJECTS_API_DASHBOARD_PRO,
        json: true
    };
    private polygonsUrl: string = urls.PROJECTS_MAP_DASHBOARD_POLY_PRO;
    private linesUrl: string = urls.PROJECTS_MAP_DASHBOARD_LINES_PRO;
    private pointsUrl: string = urls.PROJECTS_MAP_DASHBOARD_POINTS_PRO;



    constructor() {
        this.projects = [];
        console.log("ProjectsLoader initiated");
        this.loadProjects();
    }

    public loadProjects() {
        let that = this
        rp(this.projectsUrl).then(function(p) {
            that.loadFeatures(p)
            console.log(`ProjectsLoader: successfully retrieved ${that.projects.length} projects`);
        }).catch(function(err) {
            console.log(`ProjectsLoader: an error occured while retrieving the projects from API... ${err}`);
        }); 
        
    }

    private loadFeatures(projects: any) {
        console.log('ProjectsLoader: started to load features...');
        let i: number = 0;
        this.projects.forEach((project: any) => {

            // add polygons
            queryFeatures({
                url: this.polygonsUrl,
                where: `project_id=${project.projectId}`
            })
            .then((results: any) => {
                project.features.polygons = [];
                project.features.polygons.push(results.features);
                i++;
            }).catch((err) => {
                console.error(`ProjectsLoader: error: ${err}`)
            });

            // add lines
            queryFeatures({
                url: this.linesUrl,
                where: `project_id=${project.projectId}`
            })
            .then((results: any) => {
                project.features.lines = [];
                project.features.lines.push(results.features);
                i++;
            }).catch((err) => {
                console.error(`ProjectsLoader: error: ${err}`)
            });

            // add points
            queryFeatures({
                url: this.pointsUrl,
                where: `project_id=${project.projectId}`
            })
            .then((results: any) => {
                project.features.points = [];
                project.features.points.push(results.features);
                i++;
            }).catch((err) => {
                console.error(`ProjectsLoader: error: ${err}`)
            });

        }, ()=> {
            console.log(`ProjectsLoader: done loading ${i} features`)
            this.calculateMarkersLocation();
        });
    }

    private calculateMarkersLocation() {
        this.projects.forEach((project: any) => {
            let xmax: number;
            let ymax: number;
            let xmin: number;
            let ymin:number;

            project.features.polygons.geometry.rings.forEach((ring: any) => {
                ring.forEach((point: any) => {
                    if(xmax < point[0]){xmax = point[0]}
                    if(xmin > point[0]){xmin = point[0]}
                    if(ymax > point[1]){ymax = point[1]}
                    if(ymin < point[1]){ymin = point[1]}
                });
            }, () => {
                project.features.lines.geometry.rings.forEach((ring: any) => {
                    ring.forEach((point: any) => {
                        if(xmax < point[0]){xmax = point[0]}
                        if(xmin > point[0]){xmin = point[0]}
                        if(ymax > point[1]){ymax = point[1]}
                        if(ymin < point[1]){ymin = point[1]}
                    });
                }, () => {
                    project.features.points.geometry.rings.forEach((ring: any) => {
                        ring.forEach((point: any) => {
                            if(xmax < point[0]){xmax = point[0]}
                            if(xmin > point[0]){xmin = point[0]}
                            if(ymax > point[1]){ymax = point[1]}
                            if(ymin < point[1]){ymin = point[1]}
                        });
                    }, () => {
                        project.projectLocation = {
                            'xmin': xmin,
                            'ymin': ymin,
                            'xmax': xmax,
                            'ymax': ymax,
                            'xcenter': (xmax-xmin) / 2,
                            'ycenter': (ymax-ymin) / 2
                        }
                    });
                });
            });

        }, () => {
            console.log(`ProjectsLoader: done calculating locations for ${this.projects.length} project`);
        });
    }
    // get all projects from the object
    public getAllProjects(): any {
        return this.projects;
    }

}

export default new ProjectsLoader();