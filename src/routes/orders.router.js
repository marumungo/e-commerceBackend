const fs = require('fs');
const { Router } = require("express");
const { orderModel } = require("../dao/dataBase/models/order.model");
const { getOrders, getBySize, createOrders } = require('../controllers/orders.controller');

// Declaro y llamo al Router
const router = Router();

// GET que muestra las ordenes de la coleccion
router.get("/", getOrders);

// GET que muestra las ordenes de la coleccion
router.get("/reporte/:size", getBySize);

// POST que añade ordenes a la coleccion
router.post("/", createOrders);

module.exports = router;