"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_promise_1 = __importDefault(require("request-promise"));
var ProjectsLoader = /** @class */ (function () {
    function ProjectsLoader() {
        this.projectsUrlOptions = {
            uri: 'https://reqres.in/api/users',
            //uri: urls.PROJECTS_API_DASHBOARD_PRO,
            //uri: 'https://almeydan.ecouncil.ae/almeydanapi/api/dashboard',
            json: true
        };
        this.projects = [];
        console.log("ProjectsLoader initiated");
        this.loadProjects();
    }
    ProjectsLoader.prototype.loadProjects = function () {
        var that = this;
        request_promise_1.default(this.projectsUrlOptions).then(function (p) {
            that.projects = p;
            console.log("ProjectsLoader: successfully retrieved " + that.projects.length + " projects");
        }).catch(function (err) {
            console.log("ProjectsLoader: an error occured while retrieving the projects from API... " + err);
        });
    };
    // get all projects from the object
    ProjectsLoader.prototype.getAllProjects = function () {
        return this.projects;
    };
    return ProjectsLoader;
}());
exports.default = new ProjectsLoader();
//# sourceMappingURL=ProjectsLoader.js.map