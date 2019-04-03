"use strict";
// /src/loaders/Debug.ts
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
var time_stamp_1 = __importDefault(require("time-stamp"));
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var Debug = /** @class */ (function () {
    function Debug() {
        this.logArray = [];
        this.msg('info', 'log', 'started logging at /log');
        console.log('started logging at /log');
        console.log(JSON.stringify(this.getLog()));
        this.createLogFile();
    }
    Debug.prototype.msg = function (logType, logSource, logMessage) {
        logType = logType.toUpperCase();
        this.logArray.push(time_stamp_1.default('[YYYY-MM-DD] HH:mm:ss:') + " [" + logType + "] " + logSource + ": " + logMessage);
    };
    Debug.prototype.getLog = function () {
        return this.logArray;
    };
    Debug.prototype.createLogFile = function () {
        var _this = this;
        setInterval(function () {
            var hour = new Date().getHours();
            if (hour == 2) {
                try {
                    var fn = "log_" + time_stamp_1.default('YYYY-MM-DD') + ".json";
                    var year = new Date().getFullYear();
                    var yearDir = path.join(__dirname, "../logs/" + year);
                    if (!fs.existsSync(yearDir)) {
                        fs.mkdirSync(yearDir);
                    }
                    var month = new Date().getMonth();
                    var monthDir = path.join(__dirname, "../logs/" + year + "/" + month);
                    if (!fs.existsSync(monthDir)) {
                        fs.mkdirSync(monthDir);
                    }
                    fs.writeFileSync(path.join(__dirname, "../logs/" + year + "/" + month + "/" + fn), JSON.stringify(_this.logArray));
                    _this.msg('info', 'log', "created " + fn);
                    _this.logArray = [];
                }
                catch (err) {
                    _this.msg('error', 'log', "error in generating log file: " + err);
                }
            }
        }, 3600000);
    };
    Debug.log = new Debug();
    return Debug;
}());
exports.default = Debug.log;
//# sourceMappingURL=Debug.js.map