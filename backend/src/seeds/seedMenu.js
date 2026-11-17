import "dotenv/config";
import sequelize from "../database/init.js";
import { MenuItem, Product, MenuItemIngredient } from "../models/relations.js";
import { PRODUCTS, MENU } from "./menuData.js";

const seedMenu = async () => {
  await sequelize.sync();

  // 1. Insumos (não mexe no estoque dos que já existem)
  const productIds = {};
  for (const [key, data] of Object.entries(PRODUCTS)) {
    const [product] = await Product.findOrCreate({
      where: { name: data.name },
      defaults: data,
    });
    productIds[key] = product.id;
  }

  // 2. Pratos e ficha técnica
  for (const { ingredients, ...dish } of MENU) {
    const [menuItem] = await MenuItem.findOrCreate({
      where: { title: dish.title },
      defaults: { ...dish, available: true },
    });
    await menuItem.update(dish);

    // Recria a ficha técnica do prato do zero
    await MenuItemIngredient.destroy({ where: { menuItemId: menuItem.id } });
    await MenuItemIngredient.bulkCreate(
      Object.entries(ingredients).map(([key, qty]) => ({
        menuItemId: menuItem.id,
        productId: productIds[key],
        quantityRequired: qty,
      })),
    );
  }

  console.log("✅ Seed do cardápio concluído.");
};

seedMenu()
  .catch((error) => {
    console.error("❌ Erro no seed:", error);
    process.exitCode = 1;
  })
  .finally(() => sequelize.close());
