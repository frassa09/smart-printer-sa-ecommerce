import { DataTypes } from 'sequelize';
import sequelize from '../database/init.js';

export const MenuItemIngredient = sequelize.define('MenuItemIngredient', {
  quantityRequired: {
    type: DataTypes.DECIMAL(10, 3), 
    allowNull: false,
  }
}, { timestamps: true });

export default MenuItemIngredient;