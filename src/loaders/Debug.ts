// /src/loaders/Debug.ts

import timestamp from 'time-stamp';
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
        this.logArray.push(`${timestamp('[YYYY-MM-DD] HH:mm:ss:')} [${logType}] ${logSource}: ${logMessage}`);
    }

    public getLog(): string[] {
        return this.logArray;
    }

    private createLogFile() {
        setInterval(() => {
            let hour = new Date().getHours();
            if (hour == 2) {
                try{
                    let fn = `log_${timestamp('YYYY-MM-DD')}.json`;
                    let year = new Date().getFullYear();
                    let yearDir = path.join(__dirname, `../logs/${year}`);
                    if(!fs.existsSync(yearDir)){
                        fs.mkdirSync(yearDir);
                    }
                    let month = new Date().getMonth();
                    let monthDir = path.join(__dirname, `../logs/${year}/${month}`);
                    if(!fs.existsSync(monthDir)){
                        fs.mkdirSync(monthDir);
                    }
                    fs.writeFileSync(path.join(__dirname, `../logs/${year}/${month}/${fn}`),JSON.stringify(this.logArray));
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