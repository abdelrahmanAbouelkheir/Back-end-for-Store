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
exports.ProductTable = void 0;
const database_1 = __importDefault(require("../database"));
class ProductTable {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            const query = 'SELECT * FROM products';
            const result = yield connection.query(query);
            connection.release();
            return result.rows;
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            const query = 'SELECT * FROM products WHERE id = ($1)';
            const result = yield connection.query(query, [id]);
            connection.release();
            return result.rows[0];
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = product.name;
            const price = product.price;
            const connection = yield database_1.default.connect();
            const query = 'INSERT INTO products (name,price) VALUES (($1),($2)) RETURNING *';
            const result = yield connection.query(query, [name, price]);
            connection.release();
            return result.rows[0];
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = 'DELETE FROM products WHERE id = ($1) RETURNING *';
            const result = yield conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        });
    }
}
exports.ProductTable = ProductTable;
// const products = new ProductTable();
// const test = async()=>{
//   const r = await (products.create({name: 'milk',price: 22}));
//   console.log(r)
// }
// test();
