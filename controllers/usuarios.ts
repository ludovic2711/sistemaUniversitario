
import { Request, Response } from 'express'
import Empleado from '../models/empleado'

export const getUsuarios = async (req: Request, res: Response): Promise<void> => {
    try {
        const empleados = await Empleado.findAll();

        res.json({
            empleados,
        });
    } catch (error) {
        console.error('Error al obtener empleados:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const postUsuario = (req: Request, res: Response) => {

    const { body } = req;


    res.json({
        msg: 'postUsuarios',
        body
    })

}

export const putUsuario = (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;


    res.json({
        msg: 'putUsuario',
        body,
        id
    })

}

export const deleteUsuario = (req: Request, res: Response) => {

    const { id } = req.params;


    res.json({
        msg: 'deleteUsuarios',
        id
    })

}