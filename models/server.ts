
import express, { Application } from 'express';
import userRoutes from '../routes/Eventos';
import cors from 'cors'
import db from '../conection/postgresSQL';
import dbMongo from '../conection/mongo';


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/eventos'
    }


    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        //CONEXION CON POSTGRESQL
        this.dbConection();

        //CONEXION CON MONGO
        this.mongoConection();

        //Middlewares
        this.middlewares();

        //DEFINIR LAS RUTAS
        this.routes();

    }


    async mongoConection() {
        await dbMongo();
    }

    async dbConection() {
        try {
            await db.authenticate()
            console.log('Conectado a PostgreSQL')
        } catch (error) {
            throw new Error("No se está conectando");

        }
    }

    middlewares() {
        //CORS
        this.app.use(cors({}))
        //Lectura del body
        this.app.use(express.json())
        //Carpeta publica
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port)
        })
    }

}

export default Server;