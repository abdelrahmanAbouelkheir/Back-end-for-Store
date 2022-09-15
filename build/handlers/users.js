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
const user_1 = require("../models/user");
const users = new user_1.UserTable();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userFirstName = req.body.firstname;
    const userLastName = req.body.lastname;
    const pass = req.body.password;
    const user = {
        firstname: userFirstName,
        lastname: userLastName,
        password: pass
    };
    const result = yield users.create(user);
    const token = jsonwebtoken_1.default.sign({ user: result }, process.env.TOKEN_SECRET);
    res.json(token);
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorizationHeader = req.headers.authorization;
    //@ts-ignore
    const token = authorizationHeader.split(' ')[1];
    try {
        jsonwebtoken_1.default.verify(token, secretToken);
        const result = yield users.index();
        res.json(result);
    }
    catch (error) {
        res.send('wrong jwt');
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const result = yield users.destroy(id);
        res.json(result);
    }
    catch (error) {
        res.send('cannot delete user');
    }
});
const showUserProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    try {
        const result = yield users.getUserProducts(userId);
        res.json(result);
    }
    catch (error) {
        res.send('cannot show products');
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorizationHeader = req.headers.authorization;
    //@ts-ignore
    const token = authorizationHeader.split(' ')[1];
    const id = parseInt(req.params.id);
    try {
        jsonwebtoken_1.default.verify(token, secretToken);
        const result = yield users.show(id);
        res.json(result);
    }
    catch (error) {
        res.send('wrong jwt');
    }
});
const usersRoutes = (app) => {
    app.post('/users', create);
    app.get('/users', index);
    app.get('/users/:id', show);
    app.delete('/users/:id', destroy);
    app.get('/users/:id/products', showUserProducts);
};
exports.default = usersRoutes;
