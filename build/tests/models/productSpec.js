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
const product_1 = require("../../models/product");
const products = new product_1.ProductTable();
describe('Tests for products table', () => {
    it('Create', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield products.create({
            name: 'milk',
            price: 22
        });
        expect(result).toEqual({
            id: 1,
            name: 'milk',
            price: 22
        });
    }));
    it('index', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield products.index();
        expect(result).toEqual([{
                id: 1,
                name: 'milk',
                price: 22
            }]);
    }));
    it('show', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield products.show(1);
        expect(result).toEqual({
            id: 1,
            name: 'milk',
            price: 22
        });
    }));
    it('delete', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield products.destroy(1);
        expect(result).toEqual({
            id: 1,
            name: 'milk',
            price: 22
        });
    }));
});
