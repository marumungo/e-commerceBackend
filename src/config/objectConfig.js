const { connect } = require ("mongoose");

// Configuro la base de datos para que se conecte con la nube
let url = "mongodb+srv://marumungo:mariana123@cluster0.khppywt.mongodb.net/test";

module.exports = {
    connectDB: () => {
        connect(url);
        console.log("Base de datos conectada");
    }
}