import * as Sequelize from 'sequelize'
import {sequelize} from "../util/database";

export const Tweet = sequelize.define('tweet', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    value: {
        type: Sequelize.STRING,
        allowNull: false
    }
});