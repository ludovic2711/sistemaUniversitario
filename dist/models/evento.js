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
    lugar: String,
    facultadesOrganizadoras: [String],
    asistentes: [{ tipoAsistente: String,
            identificacion: String,
            nombre: String,
            apellidos: String,
            email: String,
            tipo_empleado: String, }],
    comentarios: [{ idPersona: String,
            comentario: String }]
});
module.exports = mongoose_1.default.model('evento', evento);
//# sourceMappingURL=evento.js.map