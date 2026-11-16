import 'dotenv/config';
import { Op } from 'sequelize';
import sequelize from '../database/init.js';
// IMPORTANTE: importar de relations.js garante que todos os models e associações estejam registrados.
import { MenuItem, Product, MenuItemIngredient } from '../models/relations.js';
import { PRODUCTS, MENU } from './menuData.js';

// Garante que toda chave usada na ficha técnica existe em PRODUCTS (evita erro de digitação).
const validateData = () => {
  const erros = [];
  for (const item of MENU) {
    for (const key of Object.keys(item.ingredients)) {
      if (!PRODUCTS[key]) erros.push(`"${item.title}" usa insumo inexistente: "${key}"`);
    }
  }
  if (erros.length) throw new Error(`Dados do seed inválidos:\n - ${erros.join('\n - ')}`);
};

export const seedMenu = async () => {
  validateData();

  await sequelize.authenticate();
  // Cria apenas tabelas que ainda não existem. Não altera nem apaga nada.
  await sequelize.sync();

  await sequelize.transaction(async (transaction) => {
    // 1. Insumos (estoque). Se já existir, NÃO sobrescreve o estoque atual.
    const productIds = {};
    for (const [key, data] of Object.entries(PRODUCTS)) {
      const [product] = await Product.findOrCreate({
        where: { name: data.name },
        defaults: data,
        transaction,
      });
      productIds[key] = product.id;
    }

    // 2. Pratos + ficha técnica (idempotente: pode rodar várias vezes).
    for (const { ingredients, ...dish } of MENU) {
      const [menuItem, created] = await MenuItem.findOrCreate({
        where: { title: dish.title },
        defaults: { ...dish, available: true },
        transaction,
      });
      if (!created) await menuItem.update(dish, { transaction });

      const wantedProductIds = [];
      for (const [key, qty] of Object.entries(ingredients)) {
        const productId = productIds[key];
        wantedProductIds.push(productId);

        const [row, rowCreated] = await MenuItemIngredient.findOrCreate({
          where: { menuItemId: menuItem.id, productId },
          defaults: { quantityRequired: qty },
          transaction,
        });
        if (!rowCreated) await row.update({ quantityRequired: qty }, { transaction });
      }

      // Remove ingredientes que saíram da ficha técnica desde a última execução.
      await MenuItemIngredient.destroy({
        where: { menuItemId: menuItem.id, productId: { [Op.notIn]: wantedProductIds } },
        transaction,
      });
    }
  });

  const [pratos, produtos, fichas] = await Promise.all([
    MenuItem.count(),
    Product.count(),
    MenuItemIngredient.count(),
  ]);
  console.log(`✅ Seed do cardápio concluído: ${pratos} pratos, ${produtos} insumos, ${fichas} itens de ficha técnica.`);
};

// Executa direto quando chamado via terminal (npm run seed:menu)
seedMenu()
  .catch((error) => {
    console.error('❌ Erro ao rodar o seed do cardápio:', error);
    process.exitCode = 1;
  })
  .finally(() => sequelize.close());
