import { Context } from 'koa'
import DriverService from '../service/driver.service'
import DriverSettingService from '../service/driver_settings.service'
import { getToken, getOpenId } from '../../common/util/user.utils'
import { ApiException } from '../../common/exception/api.exception'
import HttpStatusCode from '../../common/constant/http-code.constants'
class UserController {
  /**
     * login
     * @param ctx
     */
  login = async (ctx: Context) => {

  }

  /**
     * register
     * @param ctx
     */
  register = async (ctx: Context) => {
    const { code, photo, nickname } = ctx.registerDriverInfo
    const res = await getOpenId(code)
    const { openid } = res
    if (!openid) {
      throw new ApiException(HttpStatusCode.BAD_REQUEST, '临时登陆凭证错误')
    }
    const userInfo = await DriverService.getDriverUserInfo(openid, 0)
    if (userInfo) {
      throw new ApiException(HttpStatusCode.BAD_REQUEST, '该微信无法注册')
    }
    const newDrivers = await DriverService.insertDriverInfo(
      code, photo, nickname
    )
    const setDriverSettings = await DriverSettingService.newDriverSetting(newDrivers.id, {
      orientation: '',
      listenService: true,
      orderDistance: 0,
      rangeDistance: 5,
      autoAccept: false
    })

    console.log(setDriverSettings, '???????//')

    ctx.body = {
      status: 200,
      message: '用户注册成功',
      data: ''
    }
  }
}

export default new UserController()
