"use strict";
// /src/routes/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ProjectsController_1 = __importDefault(require("../controllers/ProjectsController"));
var Routes = /** @class */ (function () {
    function Routes() {
        this.projectsController = new ProjectsController_1.default();
        console.log("Routes initiated");
    }
    Routes.prototype.routes = function (app) {
        // get all projects
        app.route('/projects/load').get(this.projectsController.loadProjects);
        // get all projects
        app.route('/projects').get(this.projectsController.getAllProjects);
        // get all projects
        // app.route('/projects/:id').get(this.projectsController.getAllProjects);
    };
    return Routes;
}());
exports.Routes = Routes;
//# sourceMappingURL=index.js.map