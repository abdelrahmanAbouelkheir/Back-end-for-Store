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
exports.UserTable = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
class UserTable {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            const query = 'SELECT * FROM users';
            const result = yield connection.query(query);
            connection.release();
            return result.rows;
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            const query = 'SELECT * FROM users WHERE id = ($1)';
            const result = yield connection.query(query, [id]);
            connection.release();
            return result.rows[0];
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const firstName = user.firstname;
            const lastName = user.lastname;
            const pass = user.password;
            const hash = bcrypt_1.default.hashSync(pass + pepper, parseInt(saltRounds));
            const connection = yield database_1.default.connect();
            const query = 'INSERT INTO users (firstname,lastname,password) VALUES (($1),($2),($3)) RETURNING *';
            const result = yield connection.query(query, [firstName, lastName, hash]);
            connection.release();
            return result.rows[0];
        });
    }
    getUserProducts(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT id FROM orders WHERE user_id = ($1)';
            const conn = yield database_1.default.connect();
            const result = yield conn.query(sql, [id]);
            const orderId = result.rows[0].id;
            const sql2 = 'SELECT products.name,order_product.quantity FROM products INNER JOIN order_product ON products.id = order_product.product_id WHERE order_product.order_id = ($1)';
            const result2 = yield conn.query(sql2, [orderId]);
            conn.release();
            console.log(result2.rows);
            return result2.rows;
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = 'DELETE FROM users WHERE id = ($1) RETURNING *';
            const result = yield conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        });
    }
}
exports.UserTable = UserTable;
const users = new UserTable();
const test = () => __awaiter(void 0, void 0, void 0, function* () {
    yield users.getUserProducts(1);
});
test();
