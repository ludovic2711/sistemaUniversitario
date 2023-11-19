import { DataTypes } from "sequelize";
import db from "../conection/postgresSQL";

const Empleado = db.define('Empleado', {
  identificacion: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  nombres: {
    type: DataTypes.STRING,
  },
  apellidos: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  tipo_empleado: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'EMPLEADOS', // Nombre de la tabla en tu base de datos
  timestamps: false, // Si no usas campos de marca de tiempo created_at y updated_at
});

export default Empleado;
