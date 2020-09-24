import * as Sequlize from 'sequelize'
import {sequlize} from "../util/database";

export const Tweet = sequlize.define('tweet', {
    id: {
        type: Sequlize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequlize.INTEGER,
        allowNull: false
    },
    value: {
        type: Sequlize.STRING,
        allowNull: false
    }
});