"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// /src/loaders/geoanalyzer/ProjectsLoader.ts
require("isomorphic-fetch");
require("isomorphic-form-data");
var Debug_1 = __importDefault(require("./Debug"));
var arcgis_rest_feature_service_1 = require("@esri/arcgis-rest-feature-service");
var configuration_1 = __importDefault(require("../configuration"));
var Request = __importStar(require("request-ntlm-promise"));
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var ProjectsLoader = /** @class */ (function () {
    function ProjectsLoader() {
        var _this = this;
        this.projectsUrlOptions = {
            //uri: 'http://geoespacial.idom.com:8080/idomdigital/gsec/response/projects.json',
            url: configuration_1.default.PROJECTS_API_DASHBOARD_PRO,
            ntlm_domain: 'ecouncil',
            username: 'edic1',
            password: 'P@ssw0rd',
        };
        this.polygonsUrl = configuration_1.default.PROJECTS_MAP_DASHBOARD_POLY_PRO;
        this.linesUrl = configuration_1.default.PROJECTS_MAP_DASHBOARD_LINES_PRO;
        this.pointsUrl = configuration_1.default.PROJECTS_MAP_DASHBOARD_POINTS_PRO;
        this.projects = [];
        fs.readFile(path.join(__dirname, '../json/projects.json'), 'utf8', function (error, data) {
            if (error) {
                Debug_1.default.msg('error', 'projects loader', error.message);
            }
            else {
                _this.projects = JSON.parse(data);
            }
        });
        this.loadProjects();
        this.reloadProjects();
    }
    ProjectsLoader.prototype.loadProjects = function () {
        var _this = this;
        Request.post(this.projectsUrlOptions, {}, function (resp) {
            Debug_1.default.msg('info', 'ProjectsLoader', resp.statusCode + " Retrieved " + resp.body.length + " projects from API");
            _this.loadFeatures(resp.body);
        }).catch(function (err) {
            Debug_1.default.msg('error', 'ProjectsLoader', "" + err);
        });
    };
    ProjectsLoader.prototype.loadFeatures = function (projects) {
        var _this = this;
        console.log('ProjectsLoader: started to load features...');
        Debug_1.default.msg('info', 'ProjectsLoader', 'started to load features...');
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
                project.features.polygons = results.features;
                i++;
                p++;
                if (p == projects.length) {
                    console.log("ProjectsLoader: done fetching " + i + " features");
                    Debug_1.default.msg('info', 'ProjectsLoader', "done fetching " + i + " features");
                    _this.calculateMarkersLocation(projects);
                }
                else if (p == Math.ceil(projects.length * 0.5) || p == Math.ceil(projects.length * 0.2)
                    || p == Math.ceil(projects.length * 0.9) || p == Math.ceil(projects.length * 0.7)
                    || p == Math.ceil(projects.length * 0.1)) {
                    console.log("ProjectsLoader: fetched: " + p);
                    Debug_1.default.msg('info', 'ProjectsLoader', "fetched: " + p);
                }
            }).catch(function (err) {
                console.error("ProjectsLoader: error: " + err);
                Debug_1.default.msg('error', 'ProjectsLoader', "" + err);
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
                Debug_1.default.msg('error', 'ProjectsLoader', "" + err);
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
                Debug_1.default.msg('error', 'ProjectsLoader', "" + err);
            });
        });
    };
    ProjectsLoader.prototype.calculateMarkersLocation = function (projects) {
        var _this = this;
        console.log("ProjectsLoader: started calculating projects location");
        Debug_1.default.msg('info', 'ProjectsLoader', "started calculating projects location");
        var p = 0;
        projects.forEach(function (project) {
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
            }
            finally {
                try {
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
                }
                finally {
                    try {
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
            if (p == projects.length) {
                console.log("ProjectsLoader: done calculating locations for " + projects.length + " project");
                Debug_1.default.msg('info', 'ProjectsLoader', "done calculating locations for " + projects.length + " project");
                try {
                    _this.projects = projects;
                    fs.writeFileSync(path.join(__dirname, '../json/projects.json'), JSON.stringify(_this.projects));
                    Debug_1.default.msg('info', 'ProjectsLoader', 'updated projects.json');
                }
                catch (err) {
                    Debug_1.default.msg('error', 'ProjectsLoader', "writing json file: " + err);
                }
                //console.log(JSON.stringify(this.projects));
            }
            else if (p == Math.ceil(projects.length * 0.5) || p == Math.ceil(projects.length * 0.2)
                || p == Math.ceil(projects.length * 0.9) || p == Math.ceil(projects.length * 0.7)
                || p == Math.ceil(projects.length * 0.1)) {
                console.log("ProjectsLoader: calculated: " + p);
                Debug_1.default.msg('info', 'ProjectsLoader', "calculated: " + p);
            }
        }); // end of projects array  
    };
    // get all projects from the object
    ProjectsLoader.prototype.getAllProjects = function () {
        return this.projects;
    };
    ProjectsLoader.prototype.reloadProjects = function () {
        var _this = this;
        // each day: 86400000 millie seconds
        // each week: 604800000 millie seconds
        // each hour: 3600000 millie seconds
        setInterval(function () {
            var hour = new Date().getHours();
            if (hour == 8 || hour == 12) {
                Debug_1.default.msg('info', 'ProjectsLoader', 'Projects has started to reload as per the time interval');
                _this.loadProjects();
            }
        }, 3600000);
    };
    return ProjectsLoader;
}());
exports.default = new ProjectsLoader();
//# sourceMappingURL=ProjectsLoader.js.map