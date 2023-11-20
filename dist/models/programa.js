"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const postgresSQL_1 = __importDefault(require("../conection/postgresSQL"));
const Programa = postgresSQL_1.default.define('PROGRAMAS', {
    codigo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    AREAS_codigo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'PROGRAMAS',
    timestamps: false,
});
exports.default = Programa;
//# sourceMappingURL=programa.js.map