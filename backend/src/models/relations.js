import User from "./User.model.js";
import Order from "./Order.model.js";
import OrderItemQuantity from "./OrderItemQuantity.model.js";
import Reservation from "./Reservation.model.js";
import Table from "./Table.model.js";
import TableSession from "./TableSession.model.js";
import MenuItem from "./MenuItem.model.js";

import MenuItemIngredient from "./MenuItem.model.js";
import Product from "./Product.model.js";


User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(TableSession, { foreignKey: 'userId' });
TableSession.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Table.hasMany(Reservation, { foreignKey: 'tableId' });
Reservation.belongsTo(Table, { foreignKey: 'tableId' });

Table.hasMany(TableSession, { foreignKey: 'tableId' });
TableSession.belongsTo(Table, { foreignKey: 'tableId' });

Reservation.hasOne(TableSession, { foreignKey: 'reservationId' });
TableSession.belongsTo(Reservation, { foreignKey: 'reservationId' });

TableSession.hasMany(Order, { foreignKey: 'sessionId' });
Order.belongsTo(TableSession, { foreignKey: 'sessionId' });

Order.hasMany(OrderItemQuantity, { foreignKey: 'orderId'});
OrderItemQuantity.belongsTo(Order, { foreignKey: 'orderId' });

MenuItem.hasMany(OrderItemQuantity, { foreignKey: 'menuItemId' });
OrderItemQuantity.belongsTo(MenuItem, { foreignKey: 'menuItemId' });

// Abaixo ingredientes, Estoque
MenuItem.hasMany(MenuItemIngredient, { foreignKey: 'menuItemId' });
MenuItemIngredient.belongsTo(MenuItem, { foreignKey: 'menuItemId' });

Product.hasMany(MenuItemIngredient, { foreignKey: 'productId' });
MenuItemIngredient.belongsTo(Product, { foreignKey: 'productId' });

export {User, Reservation, TableSession, Table, Order, OrderItemQuantity, MenuItem, MenuItemIngredient, Product }