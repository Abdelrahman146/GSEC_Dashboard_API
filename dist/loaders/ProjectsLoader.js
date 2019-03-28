"use strict";
// /src/loaders/projectsLoader.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_promise_1 = __importDefault(require("request-promise"));
//import query from 'array-query';
var ProjectsLoader = /** @class */ (function () {
    // private projectsUrlOptions = {
    //     uri: 'https://reqres.in/api/users',
    //     json: true
    // };
    function ProjectsLoader() {
        this.projectsUrlOptions = {
            method: 'POST',
            uri: 'https://almeydan.ecouncil.ae/almeydanapi/api/dashboard',
            body: {
                some: 'payload'
            },
            json: true
        };
        this.projects = [];
        console.log("ProjectsLoader initiated");
        this.loadProjects();
    }
    ProjectsLoader.prototype.loadProjects = function () {
        var that = this;
        request_promise_1.default(this.projectsUrlOptions).then(function (p) {
            console.log("successfully retrieved " + p.data.length + " projects");
            that.projects = p.data;
        }).catch(function (err) {
            console.log("an error occured while retrieving the projects from API... " + err);
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