// test-models.js
import 'dotenv/config';
import sequelize from '../database/init.js'; 
import { MenuItem, Product, MenuItemIngredient } from '../models/relations.js';

async function testar() {
  let pratoCriadoId = null;
  let produtoCriadoId = null;

  try {
    // 1. Apenas cria as tabelas NOVAS se elas não existirem no banco.
    // NÃO apaga nada e NÃO altera colunas de tabelas existentes!
    await sequelize.sync(); 

    // 2. Cria 1 produto de teste
    const produto = await Product.create({
      name: 'Pão de Hambúrguer (Teste)',
      stockQuantity: 100,
      unit: 'UN'
    });
    produtoCriadoId = produto.id;

    // 3. Cria 1 item do cardápio de teste
    const prato = await MenuItem.create({
      title: 'Hambúrguer Simples (Teste)',
      price: 15.00,
      category: 'ENTRADA'
    });
    pratoCriadoId = prato.id;

    // 4. Cria a Ficha Técnica
    await MenuItemIngredient.create({
      menuItemId: prato.id,
      productId: produto.id,
      quantityRequired: 1
    });

    // 5. TESTE/VALIDAÇÃO: Consulta no banco para ver se a relação funcionou
    const resultado = await MenuItem.findByPk(prato.id, {
      include: {
        model: MenuItemIngredient,
        include: [Product]
      }
    });

    console.log('\n✅ SUCESSO! Model e relacionamentos validados:');
    console.log(`Prato: ${resultado.name}`);
    console.log(`Ingrediente: ${resultado.MenuItemIngredients[0].Product.name}`);
    console.log(`Qtd Necessária: ${resultado.MenuItemIngredients[0].quantityRequired}\n`);

  } catch (error) {
    console.error('\n❌ ERRO NO TESTE DO MODEL:', error.message);
  } finally {
    // 6. LIMPEZA: Apaga apenas os registros que criamos para este teste (opcional, mas recomendado)
    if (pratoCriadoId) {
      await MenuItemIngredient.destroy({ where: { menuItemId: pratoCriadoId } });
      await MenuItem.destroy({ where: { id: pratoCriadoId } });
    }
    if (produtoCriadoId) {
      await Product.destroy({ where: { id: produtoCriadoId } });
    }

    // Encerra a conexão com o banco
    await sequelize.close();
  }
}

testar();