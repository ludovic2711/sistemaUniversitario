import {Sequelize} from 'sequelize'

const db = new Sequelize({
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


export default db;