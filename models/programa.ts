import { DataTypes } from "sequelize";
import db from "../conection/postgresSQL";

const Programa = db.define('PROGRAMAS', {
    codigo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    AREAS_codigo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'PROGRAMAS',
    timestamps: false,
});

export default Programa;

