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
const mongoose = require('mongoose');
const dbMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect('mongodb+srv://luis:luis271103@cluster0.mjykr7w.mongodb.net/');
        console.log('DB MONGO ONLINE');
    }
    catch (error) {
        const errormsg = error.message;
        console.error('Error de coneccion de MONGO: ' + errormsg);
    }
});
exports.default = dbMongo;
//# sourceMappingURL=mongo.js.map