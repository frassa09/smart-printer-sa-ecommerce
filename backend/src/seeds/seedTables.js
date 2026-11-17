import "dotenv/config";
import sequelize from "../database/init.js";
import Table from "../models/Table.model.js";
import { createTableData } from "./tableData.js";
import { Op } from "sequelize";

const seedTables = async () => {
  await sequelize.sync();

  const TABLES = createTableData();

  for (const table of TABLES) {
    await Table.findOrCreate({
      where: { number: table.number },
      defaults: { status: table.status },
    });
  }

  Table.destroy({
    where: { number: { [Op.gt]: TABLES[TABLES.length - 1].number } },
  });

  console.log("Seed de Tables concluído");
};

seedTables()
  .catch((e) => {
    console.error(`Erro no seed de Tables: ${e.message}`);
  })
  .finally(() => {
    sequelize.close();
  });
