import { DataTypes } from "sequelize";
import db from "../conection/postgresSQL";

const Departamento = db.define('DEPARTAMENTO', {
    codigo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cod_pais: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'DEPARTAMENTOS', // Nombre de la tabla en tu base de datos
    timestamps: false, // Si no usas campos de marca de tiempo created_at y updated_at
});

export default Departamento;