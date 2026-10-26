import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const OrderItemQuantity = sequelize.define('OrderItemQuantity', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

export default OrderItemQuantity;