const {connect} = require('mongoose')

class MongoSingleton {
    static #instance;
    constructor(){
        // console.log(process.env.MONGO_URL);
        connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    };

    static getInstance(){
        if (this.#instance) {
            console.log("Base de datos ya está creada");
            return this.#instance;
        };

        this.#instance = new MongoSingleton()
        console.log("Base de datos creada");
        return this.#instance;
    };
};

module.exports = {
    MongoSingleton
};
