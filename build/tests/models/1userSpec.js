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
const user_1 = require("../../models/user");
const users = new user_1.UserTable();
describe('Tests for users table', () => {
    it('Create', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield users.create({
            firstname: 'ahmed',
            lastname: 'mohamed',
            password: 'laaa'
        });
        const pass = result.password;
        expect(result).toEqual({
            id: 1,
            firstname: 'ahmed',
            lastname: 'mohamed',
            password: pass
        });
    }));
    it('index', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield users.index();
        const pass = result[0].password;
        expect(result).toEqual([{
                id: 1,
                firstname: 'ahmed',
                lastname: 'mohamed',
                password: pass
            }]);
    }));
    it('show', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield users.show(1);
        const pass = result.password;
        expect(result).toEqual({
            id: 1,
            firstname: 'ahmed',
            lastname: 'mohamed',
            password: pass
        });
    }));
});
