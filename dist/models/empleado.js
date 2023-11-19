"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const postgresSQL_1 = __importDefault(require("../conection/postgresSQL"));
const Empleado = postgresSQL_1.default.define('Empleado', {
    identificacion: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    nombres: {
        type: sequelize_1.DataTypes.STRING,
    },
    apellidos: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    tipo_empleado: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    tableName: 'EMPLEADOS',
    timestamps: false, // Si no usas campos de marca de tiempo created_at y updated_at
});
exports.default = Empleado;
//# sourceMappingURL=empleado.js.map