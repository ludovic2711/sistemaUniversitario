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
exports.putEvento = exports.postEvento = exports.getEvento = exports.getEventos = void 0;
const empleado_1 = __importDefault(require("../models/empleado"));
const evento = require('../models/evento');
const Evento = new evento({
    titulo: 'Fiestas del poli',
    descripcion: 'Desastrosas'
});
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
        const eventoEncontrado = yield evento.findOne({ titulo: titulo }).lean();
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
    const { titulo, descripcion, categorias, lugar, facultadesOrganizadoras, asistentes } = req.body;
    try {
        for (const asistente of asistentes) {
            const empleado = yield empleado_1.default.findByPk(asistente.identificacion);
            if (empleado) {
                asistente.nombre = empleado.dataValues.nombres;
                asistente.apellidos = empleado.dataValues.apellidos;
                asistente.email = empleado.dataValues.email;
                asistente.tipo_empleado = empleado.dataValues.tipo_empleado;
            }
        }
        const nuevoEvento = new evento({
            titulo,
            descripcion,
            categorias,
            lugar,
            facultadesOrganizadoras,
            asistentes,
            fecha: obtenerFechaActual()
        });
        nuevoEvento.save();
        res.json({
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
        //let actualizado: boolean = false;
        //let resultado;
        /*
        if(body.categorias){
            resultado = await evento.updateOne({ _id: Evento._id }, { $push: { categorias: body.categorias } });
            if (resultado.acknowledged) {actualizado = true;}
        }
        if(body.facultadesOrganizadoras){
            resultado = await evento.updateOne({ _id: Evento._id }, { $push: { facultadesOrganizadoras: body.facultadesOrganizadoras } });
            if (resultado.acknowledged) {actualizado = true;}
        }
        if(body.asistentes){

            for (const asistente of body.asistentes) {
                const empleado = await Empleado.findByPk(asistente.identificacion);
                if (empleado){
                    asistente.nombre = empleado.dataValues.nombres;
                    asistente.apellidos = empleado.dataValues.apellidos;
                    asistente.email = empleado.dataValues.email;
                    asistente.tipo_empleado = empleado.dataValues.tipo_empleado;
                }
            }
            
            resultado = await evento.updateOne({ _id: Evento._id }, { $push: { asistentes: body.asistentes } });
            if (resultado.acknowledged) {actualizado = true;}
        }
        if(body.titulo){
            resultado = await evento.updateOne({ _id: Evento._id }, { $set: { titulo: body.titulo } });
            if (resultado.acknowledged) {actualizado = true;}
        }
        if(body.descripcion){
            resultado = await evento.updateOne({ _id: Evento._id }, { $set: { descripcion: body.descripcion } });
            if (resultado.acknowledged) {actualizado = true;}
        }
        if(body.lugar){
            resultado = await evento.updateOne({ _id: Evento._id }, { $set: { lugar: body.lugar } });
            if (resultado.acknowledged) {actualizado = true;}
        }
*/
        const updateOperations = {};
        if (body.categorias) {
            updateOperations.$push = { categorias: body.categorias };
        }
        if (body.facultadesOrganizadoras) {
            updateOperations.$push = { facultadesOrganizadoras: body.facultadesOrganizadoras };
        }
        if (body.asistentes) {
            for (const asistente of body.asistentes) {
                const empleado = yield empleado_1.default.findByPk(asistente.identificacion);
                if (empleado) {
                    asistente.nombre = empleado.dataValues.nombres;
                    asistente.apellidos = empleado.dataValues.apellidos;
                    asistente.email = empleado.dataValues.email;
                    asistente.tipo_empleado = empleado.dataValues.tipo_empleado;
                }
            }
            updateOperations.$push = { asistentes: body.asistentes };
        }
        if (body.titulo) {
            updateOperations.$set = { titulo: body.titulo };
        }
        if (body.descripcion) {
            updateOperations.$set = { descripcion: body.descripcion };
        }
        if (body.lugar) {
            updateOperations.$set = { lugar: body.lugar };
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
//# sourceMappingURL=eventos.js.map