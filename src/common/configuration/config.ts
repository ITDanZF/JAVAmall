import * as dotenv from 'dotenv'
import { toNumber } from 'lodash'
import { Dialect } from 'sequelize'
dotenv.config({ path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production' })
export interface Config {
  PORT: number
  DB: {
    TYPE: Dialect
    HOST: string
    PORT: number
    DATABASE_DR: string
    USERNAME: string
    PASSWORD: string
  }
  REDIS: {
    HOST: string
    PORT: number
    USERNAME: string
    PASSWORD: string
  }
}

export interface KEY {
  AccessKeyID: string
  AccessKeySecret: string
  region: string
  bucket: string
  OSS_URL: string
  appid: string
  secret: string
  grant_type: string
}

export const config: Config = {
  PORT: process.env.PORT ? toNumber(process.env.PORT) : 7001,
  DB: {
    TYPE: (process.env.DB_TYPE as Dialect) ?? 'mysql',
    HOST: process.env.DB_HOST ?? '127.0.0.1',
    PORT: process.env.DB_PORT ? toNumber(process.env.DB_PORT) : 3306,
    USERNAME: process.env.DB_USERNAME ?? 'root',
    PASSWORD: process.env.DB_PASSWORD ?? '123456',
    DATABASE_DR: process.env.DB_DATABASE_DRIVER ?? '',
  },
  REDIS: {
    HOST: process.env.REDIS_HOST ?? '127.0.0.1',
    PORT: process.env.REDIS_PORT ? toNumber(process.env.REDIS_PORT) : 6379,
    USERNAME: process.env.REDIS_USERNAME ?? 'default',
    PASSWORD: process.env.REDIS_PASSWORD ?? '123456',
  }
}

export const KEYS: KEY = {
  AccessKeyID: process.env.ACCESSKEYID ?? '',
  AccessKeySecret: process.env.ACCESSKEYSECRET ?? '',
  region: process.env.REGION ?? '',
  bucket: process.env.BUCKET ?? '',
  OSS_URL: process.env.OSS_URL ?? '',
  appid: process.env.APPPID ?? '',
  secret: process.env.SECRET ?? '',
  grant_type: process.env.GRANT_TYPE ?? ''
}
