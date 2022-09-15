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
exports.OrderTable = exports.state = void 0;
const database_1 = __importDefault(require("../database"));
var state;
(function (state) {
    state["active"] = "active";
    state["complete"] = "complete";
})(state = exports.state || (exports.state = {}));
class OrderTable {
    ordersByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            const query = 'SELECT * FROM orders WHERE user_id = ($1) ';
            const result = yield connection.query(query, [userId]);
            connection.release();
            return result.rows;
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = order.user_id;
            const status = order.status;
            const connection = yield database_1.default.connect();
            const query = 'INSERT INTO orders (user_id,status) VALUES (($1),($2)) RETURNING *';
            const result = yield connection.query(query, [userId, status]);
            connection.release();
            return result.rows[0];
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = 'DELETE FROM orders WHERE id = ($1) RETURNING *';
            const result = yield conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        });
    }
    addProduct(info) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO order_product (order_id,product_id,quantity) VALUES (($1),($2),($3)) RETURNING *';
            const conn = yield database_1.default.connect();
            const result = yield conn.query(sql, [info.order_id, info.product_id, info.quantity]);
            conn.release();
            return result.rows[0];
        });
    }
    displayAllproducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT order_product.order_id,products.name,order_product.quantity INNER JOIN order_product ON order_product.product_id = ';
        });
    }
}
exports.OrderTable = OrderTable;
