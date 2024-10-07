import express from 'express';
import { Mascota } from '../models/mascota.model.js'; // Importamos el modelo Mascota

const router = express.Router();

// Obtener todas las mascotas
router.get('/mascotas', async (req, res) => {
    try {
        const mascotas = await Mascota.findAll();
        res.json(mascotas);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener la lista de mascotas.` });
    }
});

// Obtener una mascota por ID
router.get('/mascotas/:idMascota', async (req, res) => {
    try {
        const mascota = await Mascota.findByPk(req.params.idMascota);
        if (mascota) {
            res.json(mascota);
        } else {
            res.status(404).json({ error: `Mascota no encontrada.` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la mascota.' });
    }
});

// Crear una nueva mascota
router.post('/ingresarmascota', async (req, res) => {
    try {
        const { nombre, edad, raza } = req.body; //Toma datos del cuerpo del JSON
        const nuevaMascota = await Mascota.create({ nombre, edad, raza }); //Creación de mascota
        res.status(201).json(nuevaMascota);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la mascota' });
    }
});

// Actualizar una mascota por ID
router.put('/actualizarmascota/:idMascota', async (req, res) => {
    try {
        const mascota = await Mascota.findByPk(req.params.idMascota); // Buscar la mascota por ID
        if (mascota) {
            await mascota.update(req.body); // Actualizar los datos de la mascota
            res.json(mascota); // Devolver la mascota actualizada
        } else {
            res.status(404).json({ error: 'Mascota no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la mascota' });
    }
});

// Eliminar una mascota por ID
router.delete('/eliminarmascota/:idMascota', async (req, res) => {
    try {
        const mascota = await Mascota.findByPk(req.params.idMascota); // Buscar la mascota por ID
        if (mascota) {
            await mascota.destroy(); // Eliminar la mascota
            res.json({ mensaje: 'Mascota eliminada' }); // Confirmar la eliminación
        } else {
            res.status(404).json({ error: 'Mascota no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la mascota' });
    }
});

export { router };
