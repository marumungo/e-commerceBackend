function auth(req, res, next) {
    console.log("auth", req.session)
    if (req.session?.user !== "fede" || !req.session?.user?.admin === 'admin'){
        return res.status(401).send("Error de autenticación")
    }
    next();
}

module.exports = {
    auth
}
