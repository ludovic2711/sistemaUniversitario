import { DataTypes } from "sequelize";
import db from "../conection/postgresSQL";
import Ciudad from "./ciudad";

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
  lugar_nacimiento: {
    type: DataTypes.INTEGER,
  }
}, {
  tableName: 'EMPLEADOS', // Nombre de la tabla en tu base de datos
  timestamps: false,
});

// asociación entre Empleado y Ciudad
Empleado.belongsTo(Ciudad, {
  foreignKey: 'lugar_nacimiento',
  as: 'ciudadNacimiento',
});

export default Empleado;
