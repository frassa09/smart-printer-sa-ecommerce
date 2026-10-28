import { DataTypes } from 'sequelize';
import sequelize from '../database/init.js';

export const Table = sequelize.define('Table', {
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.ENUM('AVAILABLE', 'OCCUPIED', 'RESERVED'),
    defaultValue: 'AVAILABLE',
  },
});

export default Table;