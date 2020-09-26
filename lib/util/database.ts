import * as mysql from "mysql2";
import * as Sequelize from 'sequelize';

// @ts-ignore
export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        dialect: 'mysql',
        host: process.env.DB_HOST
    });
