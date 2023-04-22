import { Context } from 'koa'
import DriverService from '../service/driver.service'
import DriverSettingService from '../service/driver_settings.service'
import { getToken, getOpenId } from '../../common/util/user.utils'
import { ApiException } from '../../common/exception/api.exception'
import HttpStatusCode from '../../common/constant/http-code.constants'
import WalletService from '../service/wallet.service'
class UserController {
  /**
     * login
     * @param ctx
     */
  login = async (ctx: Context) => {
    const { code } = ctx.loginDriverInfo
    const res = await getOpenId(code)
    const { openid } = res
    const driverIno = await DriverService.selectLoginDriverByOpenId(openid)
    console.log(driverIno)
    ctx.body = {
      status: 200,
      message: '用户登录成功',
      data: driverIno
    }
  }

  /**
     * register
     * @param ctx
     */
  register = async (ctx: Context) => {
    const { code, photo, nickname } = ctx.registerDriverInfo
    const res = await getOpenId(code)
    const { openid } = res

    const userInfo = await DriverService.getDriverUserInfo(openid, 0)
    if (userInfo) { throw new ApiException(HttpStatusCode.BAD_REQUEST, '该微信无法注册') }

    const newDrivers = await DriverService.insertDriverInfo(
      openid, photo, nickname
    )
    await DriverSettingService.newDriverSetting(newDrivers.id, {
      orientation: '',
      listenService: true,
      orderDistance: 0,
      rangeDistance: 5,
      autoAccept: false
    })

    await WalletService.inertIntoWallet(newDrivers.id, 0, null)

    const newToken = getToken({
      id: JSON.stringify(newDrivers.id)
    })
    ctx.body = {
      status: 200,
      message: '用户注册成功',
      data: {
        token: newToken
      }
    }
  }
}

export default new UserController()
