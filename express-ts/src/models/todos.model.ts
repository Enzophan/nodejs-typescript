import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

interface TodoAttributes {
    id: string;
    title: string;
    completed: boolean;
}

export class TodoInstance extends Model<TodoAttributes>{ }

TodoInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    // Other model options go here
    sequelize: db, // We need to pass the connection instance
    modelName: 'Todos' // We need to choose the model name
})