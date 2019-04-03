// /src/loaders/Debug.ts

import timestamp from 'time-stamp';

class Debug {
    
    private logArray: string[];
    public static log: Debug = new Debug();

    private constructor() {
        this.logArray = [];
        this.msg('info', 'log', 'started logging at /log');
        console.log('started logging at /log');
        console.log(JSON.stringify(this.getLog()));
    }

    public msg(logType: string, logSource: string , logMessage: string) {
        this.logArray.push(`${timestamp('[YYYY:MM:DD:HH:mm:ss]')} ${logType}: ${logSource}: ${logMessage}`);
    }

    public getLog(): string[] {
        return this.logArray;
    }
}

export default Debug.log;