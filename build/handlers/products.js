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
const product_1 = require("../models/product");
const products = new product_1.ProductTable();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productName = req.body.name;
    const productPrice = parseInt(req.body.price);
    const authorizationHeader = req.headers.authorization;
    //@ts-ignore
    const token = authorizationHeader.split(' ')[1];
    const product = {
        name: productName,
        price: productPrice
    };
    try {
        jsonwebtoken_1.default.verify(token, secretToken);
        const result = yield products.create(product);
        res.json(result);
    }
    catch (error) {
        res.send('wrong jwt');
    }
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield products.index();
        res.json(result);
    }
    catch (error) {
        res.send('cannot display products');
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const result = yield products.destroy(id);
        res.json(result);
    }
    catch (error) {
        res.send('cannot delete product');
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const result = yield products.show(id);
        res.json(result);
    }
    catch (error) {
        res.send('cannot display product');
    }
});
const productsRoutes = (app) => {
    app.post('/products', create);
    app.get('/products', index);
    app.get('/products/:id', show);
    app.delete('/products/:id', destroy);
};
exports.default = productsRoutes;
