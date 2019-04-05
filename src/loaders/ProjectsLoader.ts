// /src/loaders/geoanalyzer/ProjectsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
import log from './Debug';
import { queryFeatures  } from '@esri/arcgis-rest-feature-service';
import urls from '../configuration';
import * as Request from 'request-ntlm-promise';
import * as fs from 'fs';
import * as path from 'path';
class ProjectsLoader {

    private projects: any[];
    private projectsUrlOptions= {
        //uri: 'http://geoespacial.idom.com:8080/idomdigital/gsec/response/projects.json',
        url: urls.PROJECTS_API_DASHBOARD_PRO,
        ntlm_domain: 'ecouncil',
        username: 'edic1',
        password: 'P@ssw0rd',
    };
    private polygonsUrl: string = urls.PROJECTS_MAP_DASHBOARD_POLY_PRO;
    private linesUrl: string = urls.PROJECTS_MAP_DASHBOARD_LINES_PRO;
    private pointsUrl: string = urls.PROJECTS_MAP_DASHBOARD_POINTS_PRO;



    constructor() {
        this.projects = [];
        fs.readFile(path.join(__dirname, '../json/projects.json'), 'utf8', (error, data) => {
            if (error) {log.msg('error','projects loader',error.message);}
            else {
                this.projects = JSON.parse(data);
            }
        })
        this.loadProjects();
        this.reloadProjects();
    }

    public loadProjects() {
        Request.post(this.projectsUrlOptions, {}, (resp) => {
            log.msg('info', 'ProjectsLoader', `${resp.statusCode} Retrieved ${resp.body.length} projects from API`);
            this.loadFeatures(resp.body);
        }).catch((err) => {
            log.msg('error', 'ProjectsLoader', `${err}`);
        });
    }

    private loadFeatures(projects: any) {
        console.log('ProjectsLoader: started to load features...');
        log.msg('info','ProjectsLoader','started to load features...');
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
                project.features.polygons = results.features;
                i++;
                p++;
                if(p == projects.length) {
                    console.log(`ProjectsLoader: done fetching ${i} features`);
                    log.msg('info','ProjectsLoader',`done fetching ${i} features`);
                    this.calculateMarkersLocation(projects);
                }else if(p == Math.ceil(projects.length*0.5) || p == Math.ceil(projects.length*0.2) 
                || p == Math.ceil(projects.length*0.9) || p == Math.ceil(projects.length*0.7) 
                || p == Math.ceil(projects.length*0.1)){
                    console.log(`ProjectsLoader: fetched: ${p}`);
                    log.msg('info','ProjectsLoader',`fetched: ${p}`);
                }
            }).catch((err) => {
                console.error(`ProjectsLoader: error: ${err}`);
                log.msg('error','ProjectsLoader',`${err}`);
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
                console.error(`ProjectsLoader: error: ${err}`);
                log.msg('error','ProjectsLoader',`${err}`);
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
                console.error(`ProjectsLoader: error: ${err}`);
                log.msg('error','ProjectsLoader',`${err}`);
            });
        });
    }

    private calculateMarkersLocation(projects: any) {
        console.log(`ProjectsLoader: started calculating projects location`);
        log.msg('info','ProjectsLoader',`started calculating projects location`);
        let p: number = 0;
        projects.forEach((project: any) => {
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
            }finally {
                try {
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
                }finally {
                    try {
                        project.features.points.forEach((p: any) => {
                            if(xmax < p.geometry.x){xmax = p.geometry.x}
                            if(xmin > p.geometry.x){xmin = p.geometry.x}
                            if(ymax < p.geometry.y){ymax = p.geometry.y}
                            if(ymin > p.geometry.y){ymin = p.geometry.y}  
                        });
                    }catch(err) {
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
            if(p == projects.length){
                console.log(`ProjectsLoader: done calculating locations for ${projects.length} project`);
                log.msg('info','ProjectsLoader',`done calculating locations for ${projects.length} project`);
                try{
                    this.projects = projects;
                    fs.writeFileSync(path.join(__dirname, '../json/projects.json'),JSON.stringify(this.projects));
                    log.msg('info','ProjectsLoader', 'updated projects.json');
                }catch(err) {
                    log.msg('error','ProjectsLoader', `writing json file: ${err}`);
                }
                //console.log(JSON.stringify(this.projects));
            }else if(p == Math.ceil(projects.length*0.5) || p == Math.ceil(projects.length*0.2) 
            || p == Math.ceil(projects.length*0.9) || p == Math.ceil(projects.length*0.7) 
            || p == Math.ceil(projects.length*0.1)){
                console.log(`ProjectsLoader: calculated: ${p}`);
                log.msg('info','ProjectsLoader',`calculated: ${p}`);
            }
        }); // end of projects array  
    }

    // get all projects from the object
    public getAllProjects(): any {
        return this.projects;
    }

    private reloadProjects(): any {
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        // each hour: 3600000 millie seconds
        setInterval(()=> {
            let hour = new Date().getHours();
            if (hour == 8 || hour == 12) {
                log.msg('info', 'ProjectsLoader', 'Projects has started to reload as per the time interval');
                this.loadProjects();
            }
        }, 3600000);
    }

}

export default new ProjectsLoader();