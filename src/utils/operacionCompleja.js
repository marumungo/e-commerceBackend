const { winstonLogger } = require("../config/loggers");

process.on('message', message => {
    winstonLogger.info(message)
    let result = 0
    for (let i = 0; i < 9e9; i++) {
        result += i        
    }
    process.send(result)
});