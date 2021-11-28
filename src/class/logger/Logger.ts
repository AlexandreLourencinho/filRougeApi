import timestamp from "time-stamp";
import chalk from "chalk";

export default class Logger {

    private static output(type: string, ...entries: Array<string>): void {
        const colors = {
            log: chalk.cyan,
            info: chalk.white,
            success: chalk.green,
            warn: chalk.yellow,
            error: chalk.red
        };
        const titles = {
            log: 'LOG',
            info: 'INFO',
            success: 'SUCCESS',
            warn: 'WARN',
            error: 'ERROR'
        };
        // @ts-ignore
        const color = colors[type];
        // @ts-ignore
        const title = titles[type];
        entries.forEach(entry => {
            console.log(color(`${timestamp('[DD/MM/YYYY HH:mm:ss]')} [${title}]: ${entry}`));
        });
    }

    public static log(...entries: Array<string>): void {
        this.output('log', ...entries);
    }

    public static info(...entries: Array<string>): void {
        this.output('info', ...entries);
    }

    public static error(...entries: Array<string>): void {
        this.output('error', ...entries);
    }

    public static catch(uid: string): (...entries: Array<string>) => void {
        return (...entries) => {
            this.error(...[uid, ...entries]);
        }
    }
}