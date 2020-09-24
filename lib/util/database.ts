import * as mysql from "mysql2";
import * as Sequelize from 'sequelize';

// @ts-ignore
export const sequelize  = new Sequelize('twitter', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

