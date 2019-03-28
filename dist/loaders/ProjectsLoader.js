"use strict";
// /src/loaders/projectsLoader.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_promise_1 = __importDefault(require("request-promise"));
//import query from 'array-query';
var ProjectsLoader = /** @class */ (function () {
    function ProjectsLoader() {
        this.projectsUrlOptions = {
            uri: 'https://almeydan.ecouncil.ae/almeydanapi/api/dashboard',
            json: true
        };
        this.projects = this.fetchProjects();
        //his.projects = this.fetchProjects();
    }
    ProjectsLoader.prototype.fetchProjects = function () {
        var projects;
        request_promise_1.default(this.projectsUrlOptions).then(function (p) {
            console.log("successfully retrieved " + p.length + " projects");
            projects = p;
            return projects;
        }).catch(function (err) {
            console.log("an error occured while retrieving the projects from API...");
        });
    };
    ProjectsLoader.prototype.loadProjects = function () {
        this.projects = this.fetchProjects();
    };
    // get all projects from the object
    ProjectsLoader.prototype.getAllProjects = function () {
        return this.projects;
    };
    return ProjectsLoader;
}());
exports.default = new ProjectsLoader();
//# sourceMappingURL=ProjectsLoader.js.map