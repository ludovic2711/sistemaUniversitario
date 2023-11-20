import { DataTypes } from "sequelize";
import db from "../conection/postgresSQL";

const Facultad = db.define('FACULTADES', {
    codigo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nro_telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_decano: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'FACULTADES',
    timestamps: false,
});

export default Facultad;
