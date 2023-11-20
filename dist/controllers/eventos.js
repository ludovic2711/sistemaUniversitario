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
exports.putEventoComentario = exports.putEvento = exports.postEvento = exports.getEvento = exports.getEventos = void 0;
const empleado_1 = __importDefault(require("../models/empleado"));
const ciudad_1 = __importDefault(require("../models/ciudad"));
const departamento_1 = __importDefault(require("../models/departamento"));
const pais_1 = __importDefault(require("../models/pais"));
const facultad_1 = __importDefault(require("../models/facultad"));
const evento = require('../models/evento');
const getEventos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener todos los eventos desde MongoDB
        const eventos = yield evento.find();
        res.json({
            eventos,
        });
    }
    catch (error) {
        console.error('Error al obtener eventos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.getEventos = getEventos;
const getEvento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener todos los eventos desde MongoDB
        const titulo = req.params.titulo;
        const eventoEncontrado = yield evento.findOne({ titulo: titulo }, '_id titulo facultadesOrganizadoras programasOrganizadoras asistentes');
        if (eventoEncontrado) {
            res.json({
                evento: eventoEncontrado,
            });
        }
        else {
            res.json({ mensaje: 'Evento no encontrado' });
        }
    }
    catch (error) {
        console.error('Error al obtener el evento: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.getEvento = getEvento;
const postEvento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, descripcion, categorias, lugar, facultadesOrganizadoras, programasOrganizadoras, asistentes } = req.body;
    try {
        for (const asistente of asistentes) {
            const empleado = yield empleado_1.default.findByPk(asistente.identificacion);
            if (empleado) {
                asistente.nombreCompleto = empleado.dataValues.nombres + ' ' + empleado.dataValues.apellidos;
                asistente.email = empleado.dataValues.email;
                asistente.relacionInstitucion = empleado.dataValues.tipo_empleado;
                const ciudadNacimiento = yield ciudad_1.default.findOne({ where: { codigo: empleado.dataValues.lugar_nacimiento } });
                asistente.ciudad = ciudadNacimiento === null || ciudadNacimiento === void 0 ? void 0 : ciudadNacimiento.dataValues.nombre;
            }
            else {
                asistente.relacionInstitucion = "PERSONA EXTERNA A LA INSTITUCION";
            }
        }
        for (const facultad of facultadesOrganizadoras) {
            const facultadEncontrado = yield facultad_1.default.findOne({ where: { nombre: facultad.nombre } });
            if (facultadEncontrado) {
                facultad.ubicacion = facultadEncontrado.dataValues.ubicacion;
            }
            else {
                return res.json({
                    message: "El programa no existe en la institucion"
                });
            }
        }
        let nombreCiudad = lugar.ciudad.ciudad;
        const ciudad = yield ciudad_1.default.findOne({ where: { nombre: nombreCiudad } });
        if (ciudad) {
            let cod_dpto = ciudad.dataValues.cod_dpto;
            const departamento = yield departamento_1.default.findOne({ where: { codigo: cod_dpto } });
            if (departamento) {
                let cod_pais = departamento.dataValues.cod_pais;
                const pais = yield pais_1.default.findOne({ where: { codigo: cod_pais } });
                if (pais) {
                    lugar.ciudad.ciudad = ciudad.dataValues.nombre;
                    lugar.ciudad.departamento = departamento.dataValues.nombre;
                    lugar.ciudad.pais = pais.dataValues.nombre;
                }
            }
        }
        const nuevoEvento = new evento({
            titulo,
            descripcion,
            categorias,
            lugar,
            facultadesOrganizadoras,
            programasOrganizadoras,
            asistentes,
            fecha: obtenerFechaActual()
        });
        nuevoEvento.save();
        res.json({
            nuevoEvento,
            message: 'Guardado exitosamente en MongoDB',
        });
    }
    catch (error) {
        console.error('Error al obtener el evento: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.postEvento = postEvento;
function obtenerFechaActual() {
    const fechaActual = new Date();
    // Obtener los componentes de la fecha
    const year = fechaActual.getFullYear();
    const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const day = String(fechaActual.getDate()).padStart(2, '0');
    // Formatear la fecha como "yyyy-mm-dd"
    const fechaFormateada = `${year}-${month}-${day}`;
    return fechaFormateada;
}
const putEvento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo } = req.params;
    const { body } = req;
    const Evento = yield evento.findOne({ titulo: titulo });
    if (Evento) {
        const updateOperations = {};
        //TODOS LOS ARRAY
        if (body.categorias) {
            updateOperations.$push = Object.assign(Object.assign({}, updateOperations.$push), { categorias: body.categorias });
        }
        if (body.programasOrganizadoras) {
            updateOperations.$push = Object.assign(Object.assign({}, updateOperations.$push), { programasOrganizadoras: body.programasOrganizadoras });
        }
        if (body.facultadesOrganizadoras) {
            for (const facultad of body.facultadesOrganizadoras) {
                const facultadEncontrado = yield facultad_1.default.findOne({ where: { nombre: facultad.nombre } });
                if (facultadEncontrado) {
                    facultad.ubicacion = facultadEncontrado.dataValues.ubicacion;
                }
                else {
                    return res.json({
                        message: "El programa no existe en la institucion"
                    });
                }
            }
            updateOperations.$push = Object.assign(Object.assign({}, updateOperations.$push), { facultadesOrganizadoras: body.facultadesOrganizadoras });
        }
        if (body.asistentes) {
            for (const asistente of body.asistentes) {
                const empleado = yield empleado_1.default.findByPk(asistente.identificacion);
                if (empleado) {
                    asistente.nombreCompleto = empleado.dataValues.nombres + ' ' + empleado.dataValues.apellidos;
                    asistente.email = empleado.dataValues.email;
                    asistente.relacionInstitucion = empleado.dataValues.tipo_empleado;
                    const ciudadNacimiento = yield ciudad_1.default.findOne({ where: { codigo: empleado.dataValues.lugar_nacimiento } });
                    asistente.ciudad = ciudadNacimiento === null || ciudadNacimiento === void 0 ? void 0 : ciudadNacimiento.dataValues.nombre;
                }
                else {
                    asistente.relacionInstitucion = "PERSONA EXTERNA A LA INSTITUCION";
                }
            }
            updateOperations.$push = Object.assign(Object.assign({}, updateOperations.$push), { asistentes: body.asistentes });
        }
        //TODOS LOS CAMPOS UNITARIOS 
        if (body.titulo) {
            updateOperations.$set = Object.assign(Object.assign({}, updateOperations.$set), { titulo: body.titulo });
        }
        if (body.descripcion) {
            updateOperations.$set = Object.assign(Object.assign({}, updateOperations.$set), { descripcion: body.descripcion });
        }
        if (body.lugar) {
            if (body.lugar.nombre) {
                updateOperations.$set = Object.assign(Object.assign({}, updateOperations.$set), { 'lugar.nombre': body.lugar.nombre });
            }
            if (body.lugar.direccion) {
                updateOperations.$set = Object.assign(Object.assign({}, updateOperations.$set), { 'lugar.direccion': body.lugar.direccion });
            }
            if (body.lugar.ciudad) {
                let nombreCiudad = body.lugar.ciudad.ciudad;
                const ciudad = yield ciudad_1.default.findOne({ where: { nombre: nombreCiudad } });
                if (ciudad) {
                    let cod_dpto = ciudad.dataValues.cod_dpto;
                    const departamento = yield departamento_1.default.findOne({ where: { codigo: cod_dpto } });
                    if (departamento) {
                        let cod_pais = departamento.dataValues.cod_pais;
                        const pais = yield pais_1.default.findOne({ where: { codigo: cod_pais } });
                        if (pais) {
                            updateOperations.$set = Object.assign(Object.assign({}, updateOperations.$set), { 'lugar.ciudad.ciudad': ciudad.dataValues.nombre });
                            updateOperations.$set = Object.assign(Object.assign({}, updateOperations.$set), { 'lugar.ciudad.departamento': departamento.dataValues.nombre });
                            updateOperations.$set = Object.assign(Object.assign({}, updateOperations.$set), { 'lugar.ciudad.pais': pais.dataValues.nombre });
                        }
                    }
                }
            }
        }
        const resultado = yield evento.updateOne({ _id: Evento._id }, updateOperations);
        if (resultado.modifiedCount > 0) {
            const eventoActualizado = yield evento.findOne({ _id: Evento._id });
            res.json({ eventoActualizado, resultado });
        }
        else {
            res.json({ resultado, message: "No se realizo ningun cambio al evento: " + titulo });
        }
    }
    else {
        res.json({
            message: 'El evento con el titulo "' + titulo + '" No existe en MongoDB',
        });
    }
});
exports.putEvento = putEvento;
const putEventoComentario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    let noAsistentes = "";
    try {
        for (const comentario of body.comentarios) {
            const asistenteEncontrado = yield evento.findOne({
                'asistentes.nombreUsuario': comentario.usuario,
            });
            if (asistenteEncontrado) {
                comentario.idAsistente = asistenteEncontrado._id;
            }
            else {
                noAsistentes += "Usuario no encontrado entre los asistentes: " + comentario.usuario + "\n";
            }
        }
        const resultado = yield evento.updateOne({ _id: id }, { $push: { comentarios: { $each: body.comentarios } } });
        if (resultado.modifiedCount > 0) {
            const eventoActualizado = yield evento.findOne({ _id: id }, '_id titulo comentarios');
            res.json({ eventoActualizado, resultado });
        }
        else {
            res.json({ resultado, message: "No se realizo ningun cambio al evento " });
        }
    }
    catch (error) {
        console.error('Error al obtener el evento: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.putEventoComentario = putEventoComentario;
//# sourceMappingURL=eventos.js.map