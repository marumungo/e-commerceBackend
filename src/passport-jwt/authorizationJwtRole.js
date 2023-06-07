const authorization = role => {
    return async (req, res, next) => {
        if(!req.user) {
            return res.status(401).send({status: "error", error: "No autenticado"});
        };

        if(req.user.role !== role) {
            return res.status(403).send({status: "error", error: "No autorizado"});
        };

        next();
    };
};

module.exports = {
    authorization
};