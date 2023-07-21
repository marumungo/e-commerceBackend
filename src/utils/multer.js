const multer = require('multer');
const { dirname } = require("path");
const { winstonLogger } = require('../config/loggers');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, `${dirname(__dirname)}/public/uploads`)
    },
    filename: function(req, file, cb){
        winstonLogger.info('file: ', file)
        cb(null, `${Date.now()}-${file.originalname}`)
    } 
});

const uploader = multer({
    storage,
    onError: function(err, next){
        winstonLogger.error(err)
        next()
    }
});


module.exports = {
    uploader
};
