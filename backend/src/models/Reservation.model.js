import { DataTypes } from 'sequelize';
import sequelize from '../database/init.js';

export const Reservation = sequelize.define('Reservation', {
  reservationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('CONFIRMED', 'CANCELLED', 'COMPLETED'),
    defaultValue: 'CONFIRMED',
  },
});

export default Reservation;