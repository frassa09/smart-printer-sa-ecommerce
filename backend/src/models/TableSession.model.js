import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const TableSession = sequelize.define('TableSession', {
  status: {
    type: DataTypes.ENUM('OPEN', 'CLOSED'),
    defaultValue: 'OPEN',
  },
  openedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  closedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

export default TableSession;