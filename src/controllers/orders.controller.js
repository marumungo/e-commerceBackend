const { orderModel } = require("../dao/dataBase/models/order.model");

class OrderController {
    // GET que muestra las ordenes de la coleccion
    getOrders = async (req, res) => {
        try {
            let result = await orderModel.find();
    
            res.send({
                status: "success",
                payload: result
            });
        } catch (error) {
            console.log(error);
        };
    };

    // GET que muestra las ordenes de la coleccion
    getBySize = async (req, res) => {
        const { size } = req.params;
        try {
            let result = await orderModel.aggregate([
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
                    $group: {_id: 1, orders: {$push: "$$ROOT"}}
                },
                {
                    $project: {"_id": 0, orders: "$orders"}
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

    // POST que añade ordenes a la coleccion
    createOrders = async (req, res) => {
        try {
            let result = await orderModel.insertMany()
    
            res.send({
                status: "success",
                payload: result
            });
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = new OrderController();