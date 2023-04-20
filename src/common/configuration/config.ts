import * as dotenv from 'dotenv'
import { toNumber } from 'lodash'
import { Dialect } from 'sequelize'
dotenv.config({ path: '.env' })

export interface Config {
  PORT: number
  DB: {
    TYPE: Dialect
    HOST: string
    PORT: number
    DATABASE: string
    USERNAME: string
    PASSWORD: string
  }
}

export const config: Config = {
  PORT: process.env.PORT ? toNumber(process.env.PORT) : 7001,
  DB: {
    TYPE: (process.env.DB_TYPE as Dialect) ?? 'mysql',
    HOST: process.env.DB_HOST ?? '127.0.0.1',
    PORT: process.env.DB_PORT ? toNumber(process.env.DB_PORT) : 3306,
    DATABASE: process.env.DB_DATABASE ?? '',
    USERNAME: process.env.DB_USERNAME ?? 'root',
    PASSWORD: process.env.DB_PASSWORD ?? 'root',
  }
}
