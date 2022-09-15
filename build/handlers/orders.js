"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretToken = process.env.TOKEN_SECRET;
const order_1 = require("../models/order");
const orders = new order_1.OrderTable();
const ordersByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const authorizationHeader = req.headers.authorization;
    //@ts-ignore
    const token = authorizationHeader.split(' ')[1];
    try {
        jsonwebtoken_1.default.verify(token, secretToken);
        const result = yield orders.ordersByUser(id);
        res.json(result);
    }
    catch (error) {
        res.send('wrong jwt');
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const result = yield orders.destroy(id);
        res.json(result);
    }
    catch (error) {
        res.send('cannot delete order');
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = parseInt(req.body.product_id);
    const orderId = parseInt(req.params.id);
    const quantity = parseInt(req.body.quantity);
    const info = {
        order_id: orderId,
        product_id: productId,
        quantity: quantity
    };
    try {
        const result = yield orders.addProduct(info);
        res.json(result);
    }
    catch (erorr) {
        res.send('cannot add product');
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.body.user_id);
    const statuss = req.body.status;
    const product = {
        user_id: userId,
        status: statuss
    };
    try {
        const result = yield orders.create(product);
        res.json(result);
    }
    catch (error) {
        res.send('cannot create order');
    }
});
const ordersRoutes = (app) => {
    app.get('/orders/:id', ordersByUser);
    app.post('/orders/:id/product', addProduct);
    app.post('/orders', create);
    app.delete('/orders/:id', destroy);
};
exports.default = ordersRoutes;
