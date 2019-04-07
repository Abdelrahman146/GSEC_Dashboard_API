// /src/loaders/Debug.ts

import moment from 'moment';
import * as fs from 'fs';
import * as path from 'path';

class Debug {
    
    private logArray: string[];
	private currentLog: string;
    public static log: Debug = new Debug();

    private constructor() {
        this.logArray = [];
		this.currentLog = '';
		this.createLogFile();
        this.msg('info', 'log', 'started logging at /log');
        console.log('started logging at /log');
        //console.log(JSON.stringify(this.getLog()));
		this.newLogFile();
    }

    public msg(logType: string, logSource: string , logMessage: string) {
        logType = logType.toUpperCase();
        let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
		let text: string = `[${currentTime}] [${logType}] ${logSource}: ${logMessage}`;
        this.logArray.push(text);
		this.appendToLog(`${text} \r\n`);
    }

    public getLog(): string[] {
        return this.logArray;
    }

    private createLogFile() {
		try{
			let currentTime = moment().format('YYYY-MM-DD');
            let fn = `log_${currentTime}.log`;
            let logsDir = path.join(__dirname, `../../logs`);
            if(!fs.existsSync(logsDir)){
				fs.mkdirSync(logsDir);
            }
            let year = new Date().getFullYear();
            let yearDir = path.join(__dirname, `../../logs/${year}`);
            if(!fs.existsSync(yearDir)){
				fs.mkdirSync(yearDir);
            }
            let month = new Date().getMonth() + 1;
            let monthDir = path.join(__dirname, `../../logs/${year}/${month}`);
            if(!fs.existsSync(monthDir)){
				fs.mkdirSync(monthDir);
            }
            //fs.writeFileSync(path.join(__dirname, `/logs/${year}/${month}/${fn}`),JSON.stringify(this.logArray));
			this.currentLog = path.join(__dirname, `../../logs/${year}/${month}/${fn}`);
            this.msg('info','log', `logging in: ${this.currentLog}`);
			this.logArray.forEach((log) => {
				fs.appendFile(this.currentLog, `${log} \r\n`,(err) => {
					if (err) {this.msg('error','log', `failed to append to log file: ${err}`);}
				});
			});
            //this.logArray = [];
        }catch(err) {
            this.msg('error','log', `failed to generate log file: ${err}`);
        }
    }
	
	private appendToLog(text: string) {
		fs.appendFile(this.currentLog, text, (err) => {
			if (err) {this.msg('error','log', `failed to append to log file: ${err}`);}
		});
	}
	
	private newLogFile() {
		setInterval(() => {
            let hour = new Date().getHours();
            if (hour == 0) {
				this.logArray = [];
                this.createLogFile();
            }
        }, 3600000);
	}
}

export default Debug.log; 