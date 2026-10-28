
import {Sequelize} from 'sequelize'

const connectionString = process.env.DATABASE_CONNECTION_STRING

export const sequelize = new Sequelize(connectionString, {
   dialect: "postgres"
})

export default sequelize;