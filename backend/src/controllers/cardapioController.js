import { MenuItem } from '../models/relations.js';

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