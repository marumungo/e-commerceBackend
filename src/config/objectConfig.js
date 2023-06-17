const {connect} = require('mongoose')
const dotenv = require('dotenv')
const { commander } = require('../utils/commander');
const { MongoSingleton } = require('../utils/singleton');

const { mode } = commander.opts()
dotenv.config({
    path: mode === 'development' ? './.env.development': './.env.production' 
});

let port = process.env.PORT;
// Configuro la base de datos para que se conecte con la nube
let url = process.env.MONGO_URL;

module.exports = {
    port: port,
    // connectDB: () => {
    //     connect(url);
    //     console.log("Base de datos conectada");
    // }
    connectDB: async () => await MongoSingleton.getInstance()
}