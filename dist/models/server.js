"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Eventos_1 = __importDefault(require("../routes/Eventos"));
const cors_1 = __importDefault(require("cors"));
const postgresSQL_1 = __importDefault(require("../conection/postgresSQL"));
const mongo_1 = __importDefault(require("../conection/mongo"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/eventos'
        };
        this.app = (0, express_1.default)();
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
    mongoConection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, mongo_1.default)();
        });
    }
    dbConection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield postgresSQL_1.default.authenticate();
                console.log('Conectado a PostgreSQL');
            }
            catch (error) {
                throw new Error("No se está conectando");
            }
        });
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)({}));
        //Lectura del body
        this.app.use(express_1.default.json());
        //Carpeta publica
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, Eventos_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map