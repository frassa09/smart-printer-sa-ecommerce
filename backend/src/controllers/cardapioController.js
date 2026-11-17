import { MenuItem } from '../models/relations.js';
import Product from '../models/Product.model.js';

//GET
export const getCardapio = async (req, res) => {
  try {
    // Busca todos os pratos disponíveis
    const items = await MenuItem.findAll({
      where: { available: true },
      order: [['title', 'ASC']],
    });

    // Mapeia garantindo que imageUrl tenha um valor padrão (null) se a coluna não existir no banco
    const formattedItems = items.map((item) => {
      const data = item.toJSON();
      return {
        id: data.id,
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category,
        imageUrl: data.imageUrl || null, // Nulo por padrão enquanto não houver imagens no DB
      };
    });

    return res.json(formattedItems);
  } catch (error) {
    console.error('Erro ao buscar cardápio:', error);
    // Em caso de falha, retorna array vazio mantendo o contrato com o front-end
    return res.status(500).json([]);
  }
};

//POST
export const createCardapio = async (req, res) => {
  try {
    const { title, description, price, category, available, ingredients } = req.body;

    if (!title || price === undefined || !category) {
      return res.status(400).json({ error: 'Título, preço e categoria são obrigatórios.' });
    }

    const novoPrato = await MenuItem.create({
      title,
      description,
      price,
      category, // 'ENTRADA' | 'PRATO_PRINCIPAL' | 'SOBREMESA'
      available: available !== undefined ? available : true,
    });

    // Se vierem ingredientes no formato [{ productId: 1, quantityRequired: 0.150 }], vincula na ficha técnica
    if (Array.isArray(ingredients) && ingredients.length > 0) {
      for (const ing of ingredients) {
        await novoPrato.addProduct(ing.productId, {
          through: { quantityRequired: ing.quantityRequired },
        });
      }
    }

    return res.status(201).json(novoPrato);
  } catch (error) {
    console.error('Erro ao criar prato:', error);
    return res.status(500).json({ error: 'Erro ao cadastrar prato no cardápio.' });
  }
};

// PUT /cardapio/:id (Protegida: apenas ADMIN ou EMPLOYEE ativo)
export const updateCardapio = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, category, available } = req.body;

    const prato = await MenuItem.findByPk(id);
    if (!prato) {
      return res.status(404).json({ error: 'Prato não encontrado.' });
    }

    // Atualiza apenas os campos enviados (funciona para editar só o preço, só available, ou tudo)
    await prato.update({
      title,
      description,
      price,
      category,
      available,
    });

    return res.status(200).json(prato);
  } catch (error) {
    console.error('Erro ao atualizar prato:', error);
    return res.status(500).json({ error: 'Erro ao atualizar prato do cardápio.' });
  }
};