import { DataTypes } from 'sequelize';
import sequelize from '../database/init.js';

export const Order = sequelize.define('Order', {
  status: {
    type: DataTypes.ENUM('PENDING', 'PREPARING', 'DELIVERED', 'CANCELLED'),
    defaultValue: 'PENDING',
  },
  printStatus: {
    type: DataTypes.ENUM('PENDING', 'PRINTED', 'FAILED'),
    defaultValue: 'PENDING',
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  },

}, {timestamps: true});


export default Order;