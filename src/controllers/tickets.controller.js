const { ticketModel } = require("../dao/dataBase/models/ticket.model");

class TicketController {
    // GET que muestra los tickets de la coleccion
    getTickets = async (req, res) => {
        try {
            let result = await ticketModel.find();
    
            res.send({
                status: "success",
                payload: result
            });
        } catch (error) {
            console.log(error);
        };
    };

    // GET que muestra los tickets de la coleccion
    getBySize = async (req, res) => {
        const { size } = req.params;
        try {
            let result = await ticketModel.aggregate([
                {
                    $match: {size: size}
                },
                {
                    $group: {_id: "$name", totalQuantity: {$sum: "$quantity"}}
                },
                {
                    $sort: {totalQuantity: -1}
                },
                {
                    $group: {_id: 1, tickets: {$push: "$$ROOT"}}
                },
                {
                    $project: {"_id": 0, tickets: "$tickets"}
                },
                {
                    $merge: {into: "reportes"}
                }
            ]);

            res.send({
                status: "success",
                payload: result
            });
        } catch (error) {
            console.log(error);
        };
    };

    // POST que añade tickets a la coleccion
    addTicket = async (req, res) => {
        try {
            const ticket = await ticketModel.create(req.body);
    
            res.send({
                status: "success",
                payload: ticket
            });
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = new TicketController();