import { Request, Response } from 'express'
import Empleado from '../models/empleado'
const evento = require('../models/evento')


const Evento = new evento({
    titulo: 'Fiestas del poli',
    descripcion: 'Desastrosas'
});

export const getEventos = async (req: Request, res: Response) => {
    try {
       // Obtener todos los eventos desde MongoDB
       const eventos = await evento.find();

       res.json({
           eventos,
       });
    } catch (error) {
        console.error('Error al obtener eventos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getEvento = async (req: Request, res: Response) => {
    try {
       // Obtener todos los eventos desde MongoDB
       const titulo = req.params.titulo;

       const eventoEncontrado = await evento.findOne({ titulo: titulo }).lean();

       if (eventoEncontrado) {
            res.json({
                evento: eventoEncontrado,
            });
        } else {
            res.json({ mensaje: 'Evento no encontrado' });
        }

    } catch (error) {
        console.error('Error al obtener el evento: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


export const postEvento = async (req: Request, res: Response) => {

    const { titulo, descripcion, categorias, lugar, facultadesOrganizadoras, asistentes } = req.body;

    try {
        for (const asistente of asistentes) {
            const empleado = await Empleado.findByPk(asistente.identificacion);
            if (empleado){
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
        })

    } catch (error) {
        console.error('Error al obtener el evento: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

}

function obtenerFechaActual(): string {
    const fechaActual = new Date();

    // Obtener los componentes de la fecha
    const year = fechaActual.getFullYear();
    const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const day = String(fechaActual.getDate()).padStart(2, '0');

    // Formatear la fecha como "yyyy-mm-dd"
    const fechaFormateada = `${year}-${month}-${day}`;

    return fechaFormateada;
}

export const putEvento = async (req: Request, res: Response) => {

    const { titulo } = req.params;
    const { body } = req;

    const Evento = await evento.findOne({ titulo: titulo });

    if (Evento){
        
        const updateOperations: Record<string, any> = {};

        if (body.categorias) {
            updateOperations.$push = { categorias: body.categorias };
        }
        if (body.facultadesOrganizadoras) {
            updateOperations.$push = { facultadesOrganizadoras: body.facultadesOrganizadoras };
        }
        if (body.asistentes) {
            for (const asistente of body.asistentes) {
                const empleado = await Empleado.findByPk(asistente.identificacion);
                if (empleado){
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

        const resultado = await evento.updateOne({ _id: Evento._id }, updateOperations);

        if (resultado.modifiedCount > 0) {
            const eventoActualizado = await evento.findOne({ _id: Evento._id });
            res.json({eventoActualizado, resultado});
        } else {
            res.json({ resultado, message: "No se realizo ningun cambio al evento: " + titulo });
        }
    } else {
        res.json({
            message: 'El evento con el titulo "' + titulo + '" No existe en MongoDB',
        })
    }

}

