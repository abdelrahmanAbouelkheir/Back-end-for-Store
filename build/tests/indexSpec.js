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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const database_1 = __importDefault(require("../database"));
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJhaG1lZCIsImxhc3RuYW1lIjoibW9oYW1lZCIsInBhc3N3b3JkIjoiJDJiJDEwJG40ZkhMWTByLy5henZtaU1wVS5CTi5PcWhTbEtNWmlMWVBVbUNrQnNMdkJzSGFOZTlxTnFhIn0sImlhdCI6MTY2MDI0NDc4N30.-60akRJ98tFqFC3xygZm9727sD3vPOFq_vVQKWEyuaE";
const request = (0, supertest_1.default)(index_1.default);
describe('Test user endpoints', () => {
    it('Create Endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            "firstname": "ahmed",
            "lastname": "mohamed",
            "password": "laaa"
        };
        yield request.post("/users").send(user).expect(response => {
            expect(response.status).toBe(200);
        });
    }));
    it('Index Endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/users").set('Authorization', 'Bearer ' + token).expect(response => {
            expect(response.status).toBe(200);
        });
    }));
    it('Show Endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/users/1").set('Authorization', 'Bearer ' + token).expect(response => {
            expect(response.status).toBe(200);
        });
    }));
});
describe('Test product endpoints', () => {
    it('Create Endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = {
            "name": "pepsi",
            "price": "6",
        };
        yield request.post("/products").set('Authorization', 'Bearer ' + token).send(product).expect(response => {
            expect(response.status).toBe(200);
        });
    }));
    it('Index Endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/products").expect(response => {
            expect(response.status).toBe(200);
        });
    }));
    it('Show Endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/products/1").expect(response => {
            expect(response.status).toBe(200);
        });
    }));
    it('Delete Endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.delete("/products/1").expect(response => {
            expect(response.status).toBe(200);
        });
        const connection = yield database_1.default.connect();
        const sql = 'ALTER SEQUENCE products_id_seq RESTART WITH 1';
        yield connection.query(sql);
        const sql2 = 'UPDATE products SET id = DEFAULT';
        yield connection.query(sql2);
    }));
});
describe('Test orders endpoints', () => {
    it('Create Endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const order = {
            "user_id": "1",
            status: "complete"
        };
        yield request.post("/orders").send(order).expect(response => {
            expect(response.status).toBe(200);
        });
    }));
    it('Orders By User', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/orders/1").set('Authorization', 'Bearer ' + token).expect(response => {
            expect(response.status).toBe(200);
        });
    }));
    it('Delete Endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.delete("/orders/1").expect(response => {
            expect(response.status).toBe(200);
        });
        const connection = yield database_1.default.connect();
        const sql = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1';
        yield connection.query(sql);
        const sql2 = 'UPDATE orders SET id = DEFAULT';
        yield connection.query(sql2);
    }));
});
describe('delete user endpoint', () => {
    it('', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.delete("/users/1").expect(response => {
            expect(response.status).toBe(200);
        });
        const connection = yield database_1.default.connect();
        const sql = 'ALTER SEQUENCE users_id_seq RESTART WITH 1';
        yield connection.query(sql);
        const sql2 = 'UPDATE users SET id = DEFAULT';
        yield connection.query(sql2);
    }));
});
