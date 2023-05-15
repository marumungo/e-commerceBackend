const { connect } = require ("mongoose");
require('dotenv').config();

// Configuro la base de datos para que se conecte con la nube
let url = process.env.MONGO_URL;

module.exports = {
    connectDB: () => {
        connect(url);
        console.log("Base de datos conectada");
    }
}