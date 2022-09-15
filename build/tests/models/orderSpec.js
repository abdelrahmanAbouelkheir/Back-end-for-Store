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
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const orders = new order_1.OrderTable();
describe('Tests for orders table', () => {
    it('Create', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orders.create({
            user_id: 1,
            status: order_1.state.complete
        });
        expect(result).toEqual({
            id: 1,
            user_id: 1,
            status: order_1.state.complete
        });
    }));
    it('Get all Orders by certain user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orders.ordersByUser(1);
        expect(result).toEqual([{
                id: 1,
                user_id: 1,
                status: order_1.state.complete
            }]);
    }));
    it('delete', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orders.destroy(1);
        expect(result).toEqual({
            id: 1,
            user_id: 1,
            status: order_1.state.complete
        });
    }));
});
