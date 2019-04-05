// /src/loaders/Debug.ts

import moment from 'moment';
import * as fs from 'fs';
import * as path from 'path';

class Debug {
    
    private logArray: string[];
    public static log: Debug = new Debug();

    private constructor() {
        this.logArray = [];
        this.msg('info', 'log', 'started logging at /log');
        console.log('started logging at /log');
        console.log(JSON.stringify(this.getLog()));
        this.createLogFile();
    }

    public msg(logType: string, logSource: string , logMessage: string) {
        logType = logType.toUpperCase();
        let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        this.logArray.push(`[${currentTime}] [${logType}] ${logSource}: ${logMessage}`);
    }

    public getLog(): string[] {
        return this.logArray;
    }

    private createLogFile() {
        setInterval(() => {
            let hour = new Date().getHours();
            if (hour == 8 || hour == 126) {
                try{
                    let currentTime = moment().format('YYYY-MM-DD');
                    let fn = `log_${currentTime}.json`;
                    let logsDir = path.join(__dirname, `../logs`);
                    if(!fs.existsSync(logsDir)){
                        fs.mkdirSync(logsDir);
                    }
                    let year = new Date().getFullYear();
                    let yearDir = path.join(__dirname, `/logs/${year}`);
                    if(!fs.existsSync(yearDir)){
                        fs.mkdirSync(yearDir);
                    }
                    let month = new Date().getMonth() + 1;
                    let monthDir = path.join(__dirname, `/logs/${year}/${month}`);
                    if(!fs.existsSync(monthDir)){
                        fs.mkdirSync(monthDir);
                    }
                    fs.writeFileSync(path.join(__dirname, `/logs/${year}/${month}/${fn}`),JSON.stringify(this.logArray));
                    this.msg('info','log', `created ${fn}`);
                    this.logArray = [];
                }catch(err) {
                    this.msg('error','log', `error in generating log file: ${err}`);
                }
            }
        }, 3600000);
    }
}

export default Debug.log;