import { DataTypes } from "sequelize";
import { db } from "../database/db.js";

const Mascota = db.define('Mascotas', {
    idMascota: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    raza: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estadoAdopcion: {
        type: DataTypes.STRING,
        defaultValue: 'Disponible'
    }
});

export { Mascota };