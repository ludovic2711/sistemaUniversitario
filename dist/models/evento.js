"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const evento = new mongoose_1.default.Schema({
    titulo: String,
    descripcion: String,
    categorias: [String],
    fecha: String,
    lugar: {
        nombre: String,
        direccion: String,
        ciudad: {
            ciudad: String,
            departamento: String,
            pais: String,
        }
    },
    facultadesOrganizadoras: [{ nombre: String,
            ubicacion: String }],
    programasOrganizadoras: [String],
    asistentes: [{ tipoAsistente: String,
            identificacion: String,
            nombreUsuario: String,
            nombreCompleto: String,
            relacionInstitucion: String,
            email: String,
            ciudad: String }],
    comentarios: [{ usuario: String,
            comentario: String,
            idAsistente: String,
        }]
});
module.exports = mongoose_1.default.model('evento', evento);
//# sourceMappingURL=evento.js.map