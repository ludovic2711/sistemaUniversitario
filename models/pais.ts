import { DataTypes } from "sequelize";
import db from "../conection/postgresSQL";

const Pais = db.define('PAIS', {
    codigo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},  {
    tableName: 'PAISES', // Nombre de la tabla en tu base de datos
    timestamps: false, // Si no usas campos de marca de tiempo created_at y updated_at
});


export default Pais;