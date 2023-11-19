import mongoose from "mongoose";

const evento = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    categorias: [String],
    fecha: String,
    lugar: String,
    facultadesOrganizadoras: [String],
    asistentes: [{  tipoAsistente: String,
                    identificacion: String,
                    nombre: String,
                    apellidos: String,
                    email: String,
                    tipo_empleado: String,}],
    comentarios: [{ idPersona: String,
                    comentario: String}]
});

module.exports = mongoose.model('evento', evento);