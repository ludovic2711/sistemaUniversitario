import mongoose from "mongoose";

const evento = new mongoose.Schema({
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
    facultadesOrganizadoras: [{nombre: String,
                                ubicacion: String}],
    programasOrganizadoras: [String],
    asistentes: [{  tipoAsistente: String,
                    identificacion: String,
                    nombreUsuario: String,
                    nombreCompleto: String,
                    relacionInstitucion: String,
                    email: String,
                    ciudad: String}],
    comentarios: [{ usuario: String,
                    comentario: String,
                    idAsistente: String,
                    }]
});

module.exports = mongoose.model('evento', evento);