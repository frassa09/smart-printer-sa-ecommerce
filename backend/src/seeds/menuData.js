// Dados do seed do cardápio.
//
// PRODUCTS  -> insumos do estoque (model Product)
// MENU      -> pratos (model MenuItem) + ficha técnica (model MenuItemIngredient)
//
// Regra das quantidades: `qty` está SEMPRE na unidade do insumo.
//   KG -> quilos (0.150 = 150 g) | G -> gramas | L -> litros | ML -> mililitros | UN -> unidades
// A coluna aceita até 3 casas decimais (DECIMAL(10,3)).

export const PRODUCTS = {
  // ── Padaria / secos ──────────────────────────────────────────────
  paoItaliano:     { name: 'Pão Italiano (fatia)',          unit: 'UN', stockQuantity: 200,  minStock: 40 },
  farinhaTrigo:    { name: 'Farinha de Trigo',              unit: 'KG', stockQuantity: 25,   minStock: 5 },
  acucar:          { name: 'Açúcar Refinado',               unit: 'KG', stockQuantity: 20,   minStock: 4 },
  arrozArboreo:    { name: 'Arroz Arbóreo',                 unit: 'KG', stockQuantity: 12,   minStock: 2 },
  spaghetti:       { name: 'Spaghetti',                     unit: 'KG', stockQuantity: 15,   minStock: 3 },
  massaLasanha:    { name: 'Massa de Lasanha',              unit: 'KG', stockQuantity: 8,    minStock: 2 },
  biscoitoChampagne:{ name: 'Biscoito Champagne',           unit: 'KG', stockQuantity: 3,    minStock: 0.5 },
  biscoitoMaisena: { name: 'Biscoito Maisena',              unit: 'KG', stockQuantity: 3,    minStock: 0.5 },
  cacauPo:         { name: 'Cacau em Pó',                   unit: 'G',  stockQuantity: 1000, minStock: 200 },
  chocolate:       { name: 'Chocolate Meio Amargo',         unit: 'KG', stockQuantity: 8,    minStock: 1.5 },
  pimentaReino:    { name: 'Pimenta-do-Reino',              unit: 'G',  stockQuantity: 300,  minStock: 50 },

  // ── Hortifrúti ───────────────────────────────────────────────────
  tomate:          { name: 'Tomate Italiano',               unit: 'KG', stockQuantity: 15,   minStock: 3 },
  manjericao:      { name: 'Manjericão Fresco',             unit: 'G',  stockQuantity: 800,  minStock: 150 },
  salsinha:        { name: 'Salsinha Fresca',               unit: 'G',  stockQuantity: 600,  minStock: 100 },
  rucula:          { name: 'Rúcula',                        unit: 'G',  stockQuantity: 1500, minStock: 300 },
  alho:            { name: 'Alho',                          unit: 'G',  stockQuantity: 2000, minStock: 300 },
  cebola:          { name: 'Cebola',                        unit: 'KG', stockQuantity: 20,   minStock: 4 },
  batata:          { name: 'Batata',                        unit: 'KG', stockQuantity: 40,   minStock: 8 },
  limao:           { name: 'Limão Taiti',                   unit: 'UN', stockQuantity: 80,   minStock: 15 },
  abobrinha:       { name: 'Abobrinha',                     unit: 'KG', stockQuantity: 6,    minStock: 1 },
  cenoura:         { name: 'Cenoura',                       unit: 'KG', stockQuantity: 8,    minStock: 2 },
  brocolis:        { name: 'Brócolis',                      unit: 'KG', stockQuantity: 6,    minStock: 1 },
  cogumelo:        { name: 'Cogumelo Paris',                unit: 'KG', stockQuantity: 5,    minStock: 1 },
  frutasVermelhas: { name: 'Frutas Vermelhas',              unit: 'KG', stockQuantity: 4,    minStock: 0.8 },

  // ── Carnes e pescados ────────────────────────────────────────────
  fileMignon:      { name: 'Filé Mignon',                   unit: 'KG', stockQuantity: 15,   minStock: 3 },
  fileSalmao:      { name: 'Filé de Salmão',                unit: 'KG', stockQuantity: 10,   minStock: 2 },
  bacalhau:        { name: 'Bacalhau Dessalgado',           unit: 'KG', stockQuantity: 8,    minStock: 2 },
  camarao:         { name: 'Camarão Médio Limpo',           unit: 'KG', stockQuantity: 8,    minStock: 2 },
  peitoFrango:     { name: 'Peito de Frango',               unit: 'KG', stockQuantity: 20,   minStock: 4 },
  carneMoida:      { name: 'Carne Moída',                   unit: 'KG', stockQuantity: 12,   minStock: 3 },
  bacon:           { name: 'Bacon em Cubos',                unit: 'KG', stockQuantity: 4,    minStock: 1 },

  // ── Laticínios e ovos ────────────────────────────────────────────
  ovo:             { name: 'Ovo',                           unit: 'UN', stockQuantity: 300,  minStock: 60 },
  manteiga:        { name: 'Manteiga',                      unit: 'KG', stockQuantity: 6,    minStock: 1 },
  leite:           { name: 'Leite Integral',                unit: 'L',  stockQuantity: 20,   minStock: 4 },
  cremeLeite:      { name: 'Creme de Leite Fresco',         unit: 'L',  stockQuantity: 10,   minStock: 2 },
  leiteCondensado: { name: 'Leite Condensado (lata)',       unit: 'UN', stockQuantity: 40,   minStock: 8 },
  parmesao:        { name: 'Queijo Parmesão',               unit: 'KG', stockQuantity: 4,    minStock: 1 },
  mussarela:       { name: 'Queijo Mussarela',              unit: 'KG', stockQuantity: 10,   minStock: 2 },
  mussarelaBufala: { name: 'Mussarela de Búfala',           unit: 'KG', stockQuantity: 5,    minStock: 1 },
  mascarpone:      { name: 'Queijo Mascarpone',             unit: 'KG', stockQuantity: 5,    minStock: 1 },
  creamCheese:     { name: 'Cream Cheese',                  unit: 'KG', stockQuantity: 6,    minStock: 1 },
  sorveteCreme:    { name: 'Sorvete de Creme',              unit: 'L',  stockQuantity: 12,   minStock: 2 },

  // ── Líquidos e molhos ────────────────────────────────────────────
  azeite:          { name: 'Azeite Extra Virgem',           unit: 'ML', stockQuantity: 5000, minStock: 1000 },
  oleoFritura:     { name: 'Óleo de Soja (fritura)',        unit: 'L',  stockQuantity: 20,   minStock: 4 },
  vinhoMadeira:    { name: 'Vinho Madeira',                 unit: 'ML', stockQuantity: 3000, minStock: 500 },
  vinhoBranco:     { name: 'Vinho Branco Seco',             unit: 'ML', stockQuantity: 4000, minStock: 750 },
  caldoCarne:      { name: 'Caldo de Carne',                unit: 'L',  stockQuantity: 8,    minStock: 1.5 },
  caldoLegumes:    { name: 'Caldo de Legumes',              unit: 'L',  stockQuantity: 10,   minStock: 2 },
  molhoTomate:     { name: 'Molho de Tomate',               unit: 'L',  stockQuantity: 15,   minStock: 3 },
  cafeEspresso:    { name: 'Café Espresso',                 unit: 'ML', stockQuantity: 3000, minStock: 500 },
};

// category: 'ENTRADA' | 'PRATO_PRINCIPAL' | 'SOBREMESA'  (enum do model MenuItem)
// ingredients: { chaveDoProduct: quantidade por porção }
export const MENU = [
  // ═══════════════════════════ ENTRADAS ═══════════════════════════
  {
    title: 'Bruschetta de Tomate e Manjericão',
    description: 'Quatro fatias de pão italiano tostado com tomate fresco, alho, manjericão e fio de azeite extra virgem.',
    price: 24.9,
    category: 'ENTRADA',
    ingredients: { paoItaliano: 4, tomate: 0.15, manjericao: 8, azeite: 15, alho: 5 },
  },
  {
    title: 'Bolinho de Bacalhau',
    description: 'Seis bolinhos crocantes de bacalhau com batata e salsinha, servidos com gomos de limão.',
    price: 32.9,
    category: 'ENTRADA',
    ingredients: { bacalhau: 0.15, batata: 0.15, cebola: 0.03, salsinha: 10, ovo: 1, farinhaTrigo: 0.02, oleoFritura: 0.15, limao: 0.5 },
  },
  {
    title: 'Carpaccio de Filé Mignon',
    description: 'Finas lâminas de filé mignon com rúcula, lascas de parmesão, limão e azeite.',
    price: 42.9,
    category: 'ENTRADA',
    ingredients: { fileMignon: 0.08, rucula: 20, parmesao: 0.02, limao: 0.5, azeite: 10 },
  },
  {
    title: 'Salada Caprese',
    description: 'Mussarela de búfala, tomate maduro e manjericão fresco, finalizados com azeite extra virgem.',
    price: 29.9,
    category: 'ENTRADA',
    ingredients: { tomate: 0.2, mussarelaBufala: 0.12, manjericao: 6, azeite: 15 },
  },
  {
    title: 'Camarão ao Alho e Óleo',
    description: 'Camarões salteados no alho e azeite com salsinha, acompanhados de pão italiano.',
    price: 48.9,
    category: 'ENTRADA',
    ingredients: { camarao: 0.2, alho: 20, azeite: 40, salsinha: 5, paoItaliano: 3, limao: 0.5 },
  },

  // ═══════════════════════ PRATOS PRINCIPAIS ═══════════════════════
  {
    title: 'Filé Mignon ao Molho Madeira',
    description: 'Filé mignon grelhado ao ponto com molho madeira, acompanhado de batatas rústicas assadas.',
    price: 79.9,
    category: 'PRATO_PRINCIPAL',
    ingredients: { fileMignon: 0.28, vinhoMadeira: 60, caldoCarne: 0.1, manteiga: 0.02, batata: 0.25, azeite: 20, cebola: 0.03 },
  },
  {
    title: 'Risoto de Cogumelos',
    description: 'Arroz arbóreo cremoso com cogumelos frescos, vinho branco e parmesão.',
    price: 62.9,
    category: 'PRATO_PRINCIPAL',
    ingredients: { arrozArboreo: 0.12, cogumelo: 0.15, cebola: 0.04, vinhoBranco: 50, caldoLegumes: 0.4, parmesao: 0.03, manteiga: 0.03 },
  },
  {
    title: 'Salmão Grelhado com Legumes',
    description: 'Filé de salmão grelhado com abobrinha, cenoura e brócolis salteados, finalizado com limão.',
    price: 74.9,
    category: 'PRATO_PRINCIPAL',
    ingredients: { fileSalmao: 0.22, abobrinha: 0.1, cenoura: 0.08, brocolis: 0.1, azeite: 20, limao: 0.5 },
  },
  {
    title: 'Spaghetti à Carbonara',
    description: 'Spaghetti com bacon crocante, gema de ovo, parmesão e pimenta-do-reino, sem creme de leite.',
    price: 54.9,
    category: 'PRATO_PRINCIPAL',
    ingredients: { spaghetti: 0.12, bacon: 0.08, ovo: 2, parmesao: 0.04, pimentaReino: 2 },
  },
  {
    title: 'Frango Grelhado com Purê de Batata',
    description: 'Peito de frango grelhado e suculento com purê de batata amanteigado.',
    price: 49.9,
    category: 'PRATO_PRINCIPAL',
    ingredients: { peitoFrango: 0.25, batata: 0.2, leite: 0.08, manteiga: 0.03, azeite: 15 },
  },
  {
    title: 'Lasanha à Bolonhesa',
    description: 'Camadas de massa fresca, molho bolonhesa, mussarela e molho branco gratinada ao forno.',
    price: 52.9,
    category: 'PRATO_PRINCIPAL',
    ingredients: { massaLasanha: 0.12, carneMoida: 0.15, molhoTomate: 0.2, mussarela: 0.12, leite: 0.15, farinhaTrigo: 0.02, manteiga: 0.02, parmesao: 0.02 },
  },

  // ═══════════════════════════ SOBREMESAS ══════════════════════════
  {
    title: 'Petit Gâteau com Sorvete',
    description: 'Bolinho quente de chocolate com interior cremoso, servido com sorvete de creme.',
    price: 28.9,
    category: 'SOBREMESA',
    ingredients: { chocolate: 0.08, manteiga: 0.04, ovo: 1, acucar: 0.04, farinhaTrigo: 0.015, sorveteCreme: 0.1 },
  },
  {
    title: 'Pudim de Leite',
    description: 'Pudim de leite condensado cremoso, sem furinhos, com calda de caramelo.',
    price: 18.9,
    category: 'SOBREMESA',
    ingredients: { leiteCondensado: 0.125, leite: 0.1, ovo: 0.5, acucar: 0.03 },
  },
  {
    title: 'Tiramisù',
    description: 'Clássico italiano com camadas de biscoito champagne no café, creme de mascarpone e cacau.',
    price: 26.9,
    category: 'SOBREMESA',
    ingredients: { mascarpone: 0.1, biscoitoChampagne: 0.04, cafeEspresso: 60, cacauPo: 5, ovo: 1, acucar: 0.03 },
  },
  {
    title: 'Mousse de Chocolate',
    description: 'Mousse aerada de chocolate meio amargo com textura leve e sabor intenso.',
    price: 19.9,
    category: 'SOBREMESA',
    ingredients: { chocolate: 0.07, cremeLeite: 0.1, ovo: 1, acucar: 0.02 },
  },
  {
    title: 'Cheesecake de Frutas Vermelhas',
    description: 'Torta gelada de cream cheese com base crocante de biscoito e calda de frutas vermelhas.',
    price: 27.9,
    category: 'SOBREMESA',
    ingredients: { creamCheese: 0.12, biscoitoMaisena: 0.04, manteiga: 0.02, acucar: 0.04, frutasVermelhas: 0.04, ovo: 0.5 },
  },
];
