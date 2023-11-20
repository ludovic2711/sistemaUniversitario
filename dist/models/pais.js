"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const postgresSQL_1 = __importDefault(require("../conection/postgresSQL"));
const Pais = postgresSQL_1.default.define('PAIS', {
    codigo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'PAISES',
    timestamps: false, // Si no usas campos de marca de tiempo created_at y updated_at
});
exports.default = Pais;
//# sourceMappingURL=pais.js.map