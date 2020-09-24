import * as mysql from "mysql2";
import * as Sequlize from 'sequelize';

// @ts-ignore
export const sequlize = new Sequlize('twitter', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

