"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const postgresSQL_1 = __importDefault(require("../conection/postgresSQL"));
const Facultad = postgresSQL_1.default.define('FACULTADES', {
    codigo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ubicacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    nro_telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    id_decano: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'FACULTADES',
    timestamps: false,
});
exports.default = Facultad;
//# sourceMappingURL=facultad.js.map