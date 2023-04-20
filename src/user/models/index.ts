import { tb_driverModel } from './tb_driver.model'
import { Sequelize } from 'sequelize'
import { config } from '../../common/configuration/config'
const userSystemModels = [tb_driverModel]

const sequelize = new Sequelize('', '', '', {
  dialect: config.DB.TYPE,
  database: config.DB.DATABASE,
  username: config.DB.USERNAME,
  password: config.DB.PASSWORD,
  port: config.DB.PORT,
  host: config.DB.HOST,
})

const models = [...userSystemModels]

models.forEach((model) => {
  model.initModel(sequelize)
})

export default sequelize
