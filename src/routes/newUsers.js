const RouterClass = require("./RouterClass");

class UserRouter extends RouterClass {
    init() {
        this.get("/", async (req, res) => {
            try {
                res.sendSuccess("hola");
            } catch(error) {
                res.sendServerError(error);
            }
        });
        this.get("/current", ["PUBLIC"], async (req, res) => {
            try {
                res.sendSuccess("hola");
            } catch(error) {
                res.sendServerError(error);
            }
        })
    };
};

module.exports = UserRouter;
