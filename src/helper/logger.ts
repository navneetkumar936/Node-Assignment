export class Logger {
    log(msg) {
        console.info(msg);
    }
    info(msg) {
        console.info(msg);
    }
    warn(msg) {
        console.warn(msg);
    }
    debug(msg) {
        console.debug(msg);
    }
    error(msg) {
        console.error(msg);
    }
}

export default new Logger();