const { Router } = require("express");
const { winstonLogger } = require("../config/loggers");

class RouterClass {
    constructor() {
        this.router = Router();
        this.init();
    };

    getRouter() {
        return this.router;
    };

    init(){

    };

    // Función que se encarga de ejecutar las callbacks
    applyCallbacks(callbacks) {
        return callbacks.map(callback => async (...params) => {
            try {
                await callback.apply(this, params);
            } catch(error) {
                winstonLogger.error(error);
                // Llamo a params[1], que seria res ---> (req, res, ...)
                params[1].status(500).send(error);
            }
        })
    };

    generateCustomResponse = (req, res, next) => {
        res.sendSuccess = payload => res.send({status: "success", payload});
        res.sendServerError = error => res.send({status: "error", error});
        res.sendUserError = error => res.send({status: "error", error});
        next();
    };

    handlePolicies = policies => (req, res, next)=>{
        if (policies[0]==='PUBLIC') {
            return next()
        };
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.send({status: 'error', error: 'no autorizado'});
        };
        const token  = authHeader.split(" ")[1];
        const user = jwt.verify(token, 'CoderSecreto');
        if(!policies.includes(user.role.toUpperCase())) {
            return res.status(403).send({status: 'success', error: 'not permissions'});
        };
        req.user = user;
        next();
    };

    get(path, policies, requiredRole, ...callback) {
        this.router.get(
            path,
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callback),
        );    
    };

    post(path, policies, requiredRole, ...callback) {
        this.router.post(
            path,
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callback)
        );    
    };

    put(path, policies, requiredRole, ...callback) {
        this.router.put(
            path, 
            this.handlePolicies(policies),
            this.generateCustomResponse, 
            this.applyCallbacks(callback)
        );
    };

    delete(path, policies, requiredRole, ...callback) {
        this.router.delete(
            path, 
            this.handlePolicies(policies),
            this.generateCustomResponse, 
            this.applyCallbacks(callback)
        );
    };
};

module.exports = RouterClass;