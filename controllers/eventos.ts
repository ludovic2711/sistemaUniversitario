import { Request, Response } from 'express'
import Empleado from '../models/empleado'
import db from '../conection/postgresSQL';
import Ciudad from '../models/ciudad';
import Departamento from '../models/departamento';
import Pais from '../models/pais';
import Facultad from '../models/facultad';
const evento = require('../models/evento')

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

       const eventoEncontrado = await evento.findOne({ titulo: titulo }, '_id titulo facultadesOrganizadoras programasOrganizadoras asistentes');

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

    const { titulo, descripcion, categorias, lugar, facultadesOrganizadoras, programasOrganizadoras, asistentes } = req.body;

    try {
        for (const asistente of asistentes) {
            const empleado = await Empleado.findByPk(asistente.identificacion);
            if (empleado){
                asistente.nombreCompleto = empleado.dataValues.nombres + ' '+ empleado.dataValues.apellidos;
                asistente.email = empleado.dataValues.email;
                asistente.relacionInstitucion = empleado.dataValues.tipo_empleado;

                const ciudadNacimiento = await Ciudad.findOne({where: {codigo: empleado.dataValues.lugar_nacimiento}})

                asistente.ciudad = ciudadNacimiento?.dataValues.nombre;
            } else {
                asistente.relacionInstitucion = "PERSONA EXTERNA A LA INSTITUCION";
            }
        }

        for(const facultad of facultadesOrganizadoras) {
            const facultadEncontrado = await Facultad.findOne({where: {nombre: facultad.nombre}});

            if(facultadEncontrado){
                facultad.ubicacion = facultadEncontrado.dataValues.ubicacion;
            } else {
                return res.json({
                    message: "El programa no existe en la institucion"
                })
            }
        }

        let nombreCiudad = lugar.ciudad.ciudad;
        const ciudad = await Ciudad.findOne({ where: {nombre: nombreCiudad}});
        if (ciudad){
            let cod_dpto = ciudad.dataValues.cod_dpto;
            const departamento = await Departamento.findOne({ where: {codigo: cod_dpto}});

            if (departamento){
                let cod_pais = departamento.dataValues.cod_pais;
                const pais = await Pais.findOne({ where: {codigo: cod_pais}});

                if (pais){
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

        //TODOS LOS ARRAY
        if (body.categorias) {
            updateOperations.$push = { ...updateOperations.$push, categorias: body.categorias };
        }
        if (body.programasOrganizadoras) {
            updateOperations.$push = { ...updateOperations.$push, programasOrganizadoras: body.programasOrganizadoras };
        }
        if (body.facultadesOrganizadoras) {

            for(const facultad of body.facultadesOrganizadoras) {
                const facultadEncontrado = await Facultad.findOne({where: {nombre: facultad.nombre}});
    
                if(facultadEncontrado){
                    facultad.ubicacion = facultadEncontrado.dataValues.ubicacion;
                } else {
                    return res.json({
                        message: "El programa no existe en la institucion"
                    })
                }
            }

            updateOperations.$push = { ...updateOperations.$push, facultadesOrganizadoras: body.facultadesOrganizadoras };
        }
        if (body.asistentes) {
            for (const asistente of body.asistentes) {
                const empleado = await Empleado.findByPk(asistente.identificacion);
                if (empleado){
                    asistente.nombreCompleto = empleado.dataValues.nombres + ' '+ empleado.dataValues.apellidos;
                    asistente.email = empleado.dataValues.email;
                    asistente.relacionInstitucion = empleado.dataValues.tipo_empleado;
    
                    const ciudadNacimiento = await Ciudad.findOne({where: {codigo: empleado.dataValues.lugar_nacimiento}})
    
                    asistente.ciudad = ciudadNacimiento?.dataValues.nombre;
                } else {
                    asistente.relacionInstitucion = "PERSONA EXTERNA A LA INSTITUCION";
                }
            }

            updateOperations.$push = { ...updateOperations.$push, asistentes: body.asistentes };
        }

        //TODOS LOS CAMPOS UNITARIOS 
        if (body.titulo) {
            updateOperations.$set = { ...updateOperations.$set, titulo: body.titulo };
        }
        if (body.descripcion) {
            updateOperations.$set = { ...updateOperations.$set, descripcion: body.descripcion };
        }
        if (body.lugar) {
            if (body.lugar.nombre){
                updateOperations.$set = {...updateOperations.$set, 'lugar.nombre': body.lugar.nombre };
            }
            if(body.lugar.direccion){
                updateOperations.$set = { ...updateOperations.$set, 'lugar.direccion': body.lugar.direccion };
            }
            if(body.lugar.ciudad){
                let nombreCiudad = body.lugar.ciudad.ciudad;
                const ciudad = await Ciudad.findOne({ where: {nombre: nombreCiudad}});
                if (ciudad){
                    let cod_dpto = ciudad.dataValues.cod_dpto;
                    const departamento = await Departamento.findOne({ where: {codigo: cod_dpto}});

                    if (departamento){
                        let cod_pais = departamento.dataValues.cod_pais;
                        const pais = await Pais.findOne({ where: {codigo: cod_pais}});

                        if (pais){
                            updateOperations.$set = { ...updateOperations.$set, 'lugar.ciudad.ciudad': ciudad.dataValues.nombre };
                            updateOperations.$set = { ...updateOperations.$set, 'lugar.ciudad.departamento': departamento.dataValues.nombre };
                            updateOperations.$set = { ...updateOperations.$set, 'lugar.ciudad.pais': pais.dataValues.nombre };
                        }
                    }
                }
            }
            
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

export const putEventoComentario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    let noAsistentes:String = "";

    try {
        
        for(const comentario of body.comentarios){
            const asistenteEncontrado = await evento.findOne({
                'asistentes.nombreUsuario': comentario.usuario,
            });

            if(asistenteEncontrado){
                comentario.idAsistente = asistenteEncontrado._id;
            } else {
                noAsistentes += "Usuario no encontrado entre los asistentes: " + comentario.usuario + "\n"
            }
        }
        

        const resultado = await evento.updateOne({ _id: id }, {$push: { comentarios: { $each: body.comentarios } }});

        if (resultado.modifiedCount > 0) {
            const eventoActualizado = await evento.findOne({ _id: id }, '_id titulo comentarios');
            res.json({eventoActualizado, resultado});
        } else {
            res.json({ resultado, message: "No se realizo ningun cambio al evento "});
        }

    } catch (error) {
        console.error('Error al obtener el evento: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

}

