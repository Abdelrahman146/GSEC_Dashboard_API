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
var moment_1 = __importDefault(require("moment"));
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var Debug = /** @class */ (function () {
    function Debug() {
        this.logArray = [];
        this.currentLog = '';
        this.createLogFile();
        this.msg('info', 'log', 'started logging at /log');
        console.log('started logging at /log');
        //console.log(JSON.stringify(this.getLog()));
        this.newLogFile();
    }
    Debug.prototype.msg = function (logType, logSource, logMessage) {
        logType = logType.toUpperCase();
        var currentTime = moment_1.default().format('YYYY-MM-DD HH:mm:ss');
        var text = "[" + currentTime + "] [" + logType + "] " + logSource + ": " + logMessage;
        this.logArray.push(text);
        this.appendToLog(text + " \r\n");
    };
    Debug.prototype.getLog = function () {
        return this.logArray;
    };
    Debug.prototype.createLogFile = function () {
        var _this = this;
        try {
            var currentTime = moment_1.default().format('YYYY-MM-DD');
            var fn = "log_" + currentTime + ".log";
            var logsDir = path.join(__dirname, "../../logs");
            if (!fs.existsSync(logsDir)) {
                fs.mkdirSync(logsDir);
            }
            var year = new Date().getFullYear();
            var yearDir = path.join(__dirname, "../../logs/" + year);
            if (!fs.existsSync(yearDir)) {
                fs.mkdirSync(yearDir);
            }
            var month = new Date().getMonth() + 1;
            var monthDir = path.join(__dirname, "../../logs/" + year + "/" + month);
            if (!fs.existsSync(monthDir)) {
                fs.mkdirSync(monthDir);
            }
            //fs.writeFileSync(path.join(__dirname, `/logs/${year}/${month}/${fn}`),JSON.stringify(this.logArray));
            this.currentLog = path.join(__dirname, "../../logs/" + year + "/" + month + "/" + fn);
            this.msg('info', 'log', "logging in: " + this.currentLog);
            this.logArray.forEach(function (log) {
                fs.appendFile(_this.currentLog, log + " \r\n", function (err) {
                    if (err) {
                        _this.msg('error', 'log', "failed to append to log file: " + err);
                    }
                });
            });
            //this.logArray = [];
        }
        catch (err) {
            this.msg('error', 'log', "failed to generate log file: " + err);
        }
    };
    Debug.prototype.appendToLog = function (text) {
        var _this = this;
        fs.appendFile(this.currentLog, text, function (err) {
            if (err) {
                _this.msg('error', 'log', "failed to append to log file: " + err);
            }
        });
    };
    Debug.prototype.newLogFile = function () {
        var _this = this;
        setInterval(function () {
            var hour = new Date().getHours();
            if (hour == 0) {
                _this.logArray = [];
                _this.createLogFile();
            }
        }, 3600000);
    };
    Debug.log = new Debug();
    return Debug;
}());
exports.default = Debug.log;
//# sourceMappingURL=Debug.js.map