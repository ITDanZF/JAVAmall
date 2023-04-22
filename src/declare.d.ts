import * as Koa from 'koa'
import { Sequelize } from 'sequelize'
import { TokenUserInfo } from './dto/user.dto'

declare module 'koa' {
  interface Context {
    userinfo: TokenUserInfo
    loginUsersInfo: any,

    /**
     * 司机注册上下文
     */
    registerDriverInfo: any,

    /**
     * 司机登录上下文
     */
    loginDriverInfo: any
    orm: Sequelize
  }
}
