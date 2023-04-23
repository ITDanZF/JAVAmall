import { Context, Next } from 'koa'
import HttpStatusCode from '../common/constant/http-code.constants'
import { ApiException } from '../common/exception/api.exception'
import { token2UserInfo } from '../common/util/user.utils'
import Redis from '../db/redis'
import { RedisKeyConstants } from '../common/constant/Redis-key.constants'

/**
 * token解析中间件
 * @param ctx
 * @param next
 */
export const tokenRequired = async (ctx: Context, next: Next) => {
  const token = ctx.headers.token as string ?? ctx.cookies.get('token')
  if (!token) {
    throw new ApiException(HttpStatusCode.UNAUTHORIZED, 'require login')
  }
  const userinfo = await token2UserInfo(token)
  if (!userinfo) {
    ctx.throw(HttpStatusCode.INTERNAL_SERVER_ERROR)
  }
  const loginStatus = await Redis.hget(RedisKeyConstants.loginRedis, userinfo.id)
  if (!loginStatus && token !== loginStatus) {
    throw new ApiException(HttpStatusCode.BAD_REQUEST, '该用户未登录')
  }

  ctx.userinfo = userinfo

  await next()
}
