"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const postgresSQL_1 = __importDefault(require("../conection/postgresSQL"));
const ciudad_1 = __importDefault(require("./ciudad"));
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
    lugar_nacimiento: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    tableName: 'EMPLEADOS',
    timestamps: false,
});
// asociación entre Empleado y Ciudad
Empleado.belongsTo(ciudad_1.default, {
    foreignKey: 'lugar_nacimiento',
    as: 'ciudadNacimiento',
});
exports.default = Empleado;
//# sourceMappingURL=empleado.js.map