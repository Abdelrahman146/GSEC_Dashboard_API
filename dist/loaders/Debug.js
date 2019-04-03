"use strict";
// /src/loaders/Debug.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var time_stamp_1 = __importDefault(require("time-stamp"));
var Debug = /** @class */ (function () {
    function Debug() {
        this.logArray = [];
        this.msg('info', 'log', 'started logging at /log');
        console.log('started logging at /log');
        console.log(JSON.stringify(this.getLog()));
    }
    Debug.prototype.msg = function (logType, logSource, logMessage) {
        this.logArray.push(time_stamp_1.default('[YYYY:MM:DD:HH:mm:ss]') + " " + logType + ": " + logSource + ": " + logMessage);
    };
    Debug.prototype.getLog = function () {
        return this.logArray;
    };
    Debug.log = new Debug();
    return Debug;
}());
exports.default = Debug.log;
//# sourceMappingURL=Debug.js.map