export const createTableData = () => {
  const TABLES = [];
  const tablesQty = 36;

  for (let i = 0; i < tablesQty; i++) {
    const table = {
      number: i,
      status: "AVAILABLE",
    };

    TABLES.push(table);
  }

  return TABLES
};

createTableData();
