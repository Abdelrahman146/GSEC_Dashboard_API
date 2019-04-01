"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/geoanalyzer/ProjectsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var configuration_1 = __importDefault(require("../configuration"));
var request_promise_1 = __importDefault(require("request-promise"));
var ProjectsLoader = /** @class */ (function () {
    function ProjectsLoader() {
        this.projectsUrl = {
            uri: 'http://geoespacial.idom.com:8080/idomdigital/gsec/response/projects.json',
            //uri: urls.PROJECTS_API_DASHBOARD_PRO,
            json: true
        };
        this.polygonsUrl = configuration_1.default.PROJECTS_MAP_DASHBOARD_POLY_PRO;
        this.linesUrl = configuration_1.default.PROJECTS_MAP_DASHBOARD_LINES_PRO;
        this.pointsUrl = configuration_1.default.PROJECTS_MAP_DASHBOARD_POINTS_PRO;
        this.projects = [];
        this.loadProjects();
        this.reloadProjects();
    }
    ProjectsLoader.prototype.loadProjects = function () {
        var that = this;
        request_promise_1.default(this.projectsUrl).then(function (p) {
            console.log("ProjectsLoader: successfully retrieved " + p.data.length + " projects");
            that.loadFeatures(p.data);
        }).catch(function (err) {
            console.log("ProjectsLoader: an error occured while retrieving the projects from API... " + err);
        });
    };
    ProjectsLoader.prototype.loadFeatures = function (projects) {
        var _this = this;
        console.log('ProjectsLoader: started to load features...');
        var i = 0;
        var p = 1;
        projects.forEach(function (project) {
            project.features = {};
            // add polygons
            arcgis_rest_feature_service_1.queryFeatures({
                url: _this.polygonsUrl,
                where: "project_id='" + project.projectId + "'"
            })
                .then(function (results) {
                //console.log(`ProjectLoader: fetching geometries for project ${p++} / ${projects.length}`);
                project.features.polygons = results.features;
                i++;
                p++;
                if (p == projects.length) {
                    _this.projects = projects;
                    console.log("ProjectsLoader: done fetching " + i + " features");
                    _this.calculateMarkersLocation();
                }
                else if (p == Math.ceil(projects.length * 0.5) || p == Math.ceil(projects.length * 0.2) || p == Math.ceil(projects.length * 0.9) || p == Math.ceil(projects.length * 0.7) || p == Math.ceil(projects.length * 0.1)) {
                    console.log("ProjectsLoader: fetched: " + p);
                }
            }).catch(function (err) {
                console.error("ProjectsLoader: error: " + err);
            });
            // add lines
            arcgis_rest_feature_service_1.queryFeatures({
                url: _this.linesUrl,
                where: "project_id='" + project.projectId + "'"
            })
                .then(function (results) {
                project.features.lines = results.features;
                i++;
            }).catch(function (err) {
                console.error("ProjectsLoader: error: " + err);
            });
            // add points
            arcgis_rest_feature_service_1.queryFeatures({
                url: _this.pointsUrl,
                where: "project_id='" + project.projectId + "'"
            })
                .then(function (results) {
                project.features.points = results.features;
                i++;
            }).catch(function (err) {
                console.error("ProjectsLoader: error: " + err);
            });
        });
    };
    ProjectsLoader.prototype.calculateMarkersLocation = function () {
        var _this = this;
        console.log("ProjectsLoader: started calculating projects location");
        var p = 0;
        this.projects.forEach(function (project) {
            var xmax = 0;
            var ymax = 0;
            var xmin = 100000000000;
            var ymin = 100000000000;
            p++;
            try {
                project.features.polygons.forEach(function (polygon) {
                    polygon.geometry.rings.forEach(function (ring) {
                        ring.forEach(function (point) {
                            if (xmax < point[0]) {
                                xmax = point[0];
                            }
                            if (xmin > point[0]) {
                                xmin = point[0];
                            }
                            if (ymax < point[1]) {
                                ymax = point[1];
                            }
                            if (ymin > point[1]) {
                                ymin = point[1];
                            }
                        });
                    });
                });
            }
            catch (err) {
                //console.error(`ProjectLoader error: (polygons) ${p} -  ${err}`);
            }
            finally {
                try {
                    //console.log(`getting lines for project ${p}`);
                    project.features.lines.forEach(function (line) {
                        line.geometry.paths.forEach(function (path) {
                            path.forEach(function (point) {
                                if (xmax < point[0]) {
                                    xmax = point[0];
                                }
                                if (xmin > point[0]) {
                                    xmin = point[0];
                                }
                                if (ymax < point[1]) {
                                    ymax = point[1];
                                }
                                if (ymin > point[1]) {
                                    ymin = point[1];
                                }
                            });
                        });
                    });
                }
                catch (err) {
                    //console.error(`ProjectLoader error: (lines) ${p} - ${err}`);
                }
                finally {
                    try {
                        //console.log(`getting points for project ${p}`);
                        project.features.points.forEach(function (p) {
                            if (xmax < p.geometry.x) {
                                xmax = p.geometry.x;
                            }
                            if (xmin > p.geometry.x) {
                                xmin = p.geometry.x;
                            }
                            if (ymax < p.geometry.y) {
                                ymax = p.geometry.y;
                            }
                            if (ymin > p.geometry.y) {
                                ymin = p.geometry.y;
                            }
                        });
                    }
                    catch (err) {
                        //console.error(`ProjectLoader error: (points) ${p} - ${err}`);
                    }
                    finally {
                        project.projectLocation = {
                            'xmin': xmin,
                            'ymin': ymin,
                            'xmax': xmax,
                            'ymax': ymax,
                            'xcenter': (xmax + xmin) / 2,
                            'ycenter': (ymax + ymin) / 2
                        };
                    }
                }
            }
            if (p == _this.projects.length) {
                console.log("ProjectsLoader: done calculating locations for " + _this.projects.length + " project");
                //console.log(JSON.stringify(this.projects));
            }
            else if (p == Math.ceil(_this.projects.length * 0.5) || p == Math.ceil(_this.projects.length * 0.2) || p == Math.ceil(_this.projects.length * 0.9) || p == Math.ceil(_this.projects.length * 0.7) || p == Math.ceil(_this.projects.length * 0.1)) {
                console.log("ProjectsLoader: calculated: " + p);
            }
        }); // end of projects array  
    };
    // get all projects from the object
    ProjectsLoader.prototype.getAllProjects = function () {
        //console.log(`ProjectLoader: requested to get projects ${JSON.stringify(this.projects)}`);
        return this.projects;
    };
    ProjectsLoader.prototype.reloadProjects = function () {
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        setInterval(this.loadProjects, 86400000);
    };
    return ProjectsLoader;
}());
exports.default = new ProjectsLoader();
//# sourceMappingURL=ProjectsLoader.js.map