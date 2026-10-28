import { DataTypes } from 'sequelize';
import sequelize from '../database/init.js';

export const MenuItem = sequelize.define('MenuItem', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM('ENTRADA', 'PRATO_PRINCIPAL', 'SOBREMESA'), 
    allowNull: false,
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default MenuItem;