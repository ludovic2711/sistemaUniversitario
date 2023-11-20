import { DataTypes } from "sequelize";
import db from "../conection/postgresSQL";

const Ciudad = db.define('CIUDAD', {
    codigo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cod_dpto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'CIUDADES', // Nombre de la tabla en tu base de datos
    timestamps: false, // Si no usas campos de marca de tiempo created_at y updated_at
});

export default Ciudad;
