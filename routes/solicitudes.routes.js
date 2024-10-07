import express from "express";
import { Solicitud } from "../models/solicitud.model.js";
import { Mascota } from "../models/mascota.model.js";

const router = express.Router();

//Obtener todas las solicitudes de adopción
router.get('/solicitudes', async (req, res) => {
    try {
        // Busca todas las solicitudes e incluye las mascota
        const solicitudes = await Solicitud.findAll({ include: Mascota });
        res.json(solicitudes);
    } catch (error) {
        res.status(500).json({ error: `error al obtener solicitudes.` })
    }
});

// Buscar solicitud por id
router.get('/solicitudes/:id', async (req, res) => {
    try {
        const solicitud = await Solicitud.findByPk(req.params.id, { include: Mascota });
        if (solicitud) {
            res.json(solicitud);
        } else {
            res.status(404).json({
                error: `Solicitud no encontrada.`
            });
        }
    } catch (error) {
        res.status(500).json({
            error: `Error al obtener la solicitud.`
        });
    }
});

// Crear solicitud
router.post('/nuevasolicitud', async (req, res) => {
    try {
        const { idMascota, identidadSolicitante } = req.body;

        const mascota = await Mascota.findByPk(idMascota);
        if (!mascota) {
            return res.status(404).json({
                error: `Mascota no encontrada.`
            });
        }

        const solicitud = await Solicitud.create({
            idMascota,
            identidadSolicitante
        });

        // Enviar la solicitud creada.
        res.status(201).json(solicitud);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'Error al crear la solicitud.'
        });
    }
});

//Actualizar una solicitud
router.put('/actualizarsolicitud/:id', async (req, res) => {
    try {
        const solicitud = await Solicitud.findByPk(req.params.id);

        if (!solicitud) {
            return res.status(404).json({ error: 'Solicitud no encontrada.' });
        }

        // Si el estado de la solicitud es 'Aceptada', entonces se rechazan las
        // demás solicitudes para esa mascota porque ya pasa a ser 'Adoptada'.
        if (req.body.estado === 'Aceptada') {
            const mascota = await Mascota.findByPk(solicitud.idMascota);

            if (!mascota) {
                return res.status(404).json({ error: 'Mascota no encontrada.' });
            }

            // Cambiar el estado de la mascota a 'Adoptada'
            await mascota.update({ estadoAdopcion: 'Adoptada' });

            // Actualizar la solicitud a 'Aceptada'
            await solicitud.update({ estado: 'Aceptada' });

            // Rechazar las otras solicitudes pendientes para esta mascota
            await Solicitud.update(
                { estado: 'Rechazada' },
                { where: { idMascota: solicitud.idMascota, estado: 'Pendiente' } }
            );

            return res.json({ mensaje: 'Solicitud aceptada.' });
        } else {
            // Para cualquier otro cambio, solo actualiza la solicitud
            await solicitud.update(req.body);
            return res.json(solicitud);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la solicitud.' });
    }
});


// Eliminar solicitud.
router.delete('/eliminarsolicitud/:id', async (req, res) => {
    try {
        const solicitud = await Solicitud.findByPk(req.params.id);
        if (solicitud) {
            await solicitud.destroy();
            res.json({ mensaje: 'Solicitud eliminada' });
        } else {
            res.status(404).json({ error: 'Solicitud no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la solicitud' });
    }
});


export { router };