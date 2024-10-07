import { DataTypes } from "sequelize";
import { db } from "../database/db.js";
import { Mascota } from "./mascota.model.js";

const Solicitud = db.define('Solicitudes', {
    idSolicitud: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    identidadSolicitante: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
            len: [6, 10]
        }
    },
    fechaSolicitud: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: 'Pendiente'
    }


});

// Relación
Solicitud.belongsTo(Mascota, {
    foreignKey: 'idMascota',
    onDelete: 'CASCADE'
});

export { Solicitud };
