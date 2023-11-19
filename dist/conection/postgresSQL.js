"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize({
    database: 'finalBD',
    username: 'postgres',
    password: '1234',
    host: 'localhost',
    dialect: 'postgres',
});
// Manejar eventos de conexión
db.authenticate()
    .then(() => {
    console.log('Conexión exitosa a la base de datos.');
})
    .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
});
exports.default = db;
//# sourceMappingURL=postgresSQL.js.map