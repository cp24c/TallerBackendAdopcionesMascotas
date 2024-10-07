import { Sequelize } from 'sequelize';

const db = new Sequelize('adopcionespaz', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export { db };