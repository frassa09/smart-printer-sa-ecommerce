import { DataTypes } from 'sequelize';
import sequelize from '../database/init.js';

export const Product = sequelize.define('Product', {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    stockQuantity: {
    type: DataTypes.DECIMAL(10, 3), 
    allowNull: false,
    defaultValue: 0,
    },
    unit: {
        type: DataTypes.ENUM('KG', 'G', 'L', 'ML', 'UN'),
        allowNull: false,
        defaultValue: 'UN',
    },
    minStock: {
        type: DataTypes.DECIMAL(10, 3), 
        defaultValue: 0,
    }
    }, { timestamps: true });

export default Product;
