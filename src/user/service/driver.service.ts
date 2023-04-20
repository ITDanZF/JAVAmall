import { isEmpty } from 'lodash'
import HttpStatusCode from '../../common/constant/http-code.constants'
import { ApiException } from '../../common/exception/api.exception'
import { tb_driverModel } from '../models/tb_driver.model'
import { TokenUserInfo } from '../dto/user.dto'

class DriverService {
  /**
     * 用户注册
     * @param dto
     */
  async createUser (dto: TokenUserInfo) {

  }

  /**
   * 获取用户信息
   * @param openid
   * @param id
   */
  async getDriverUserInfo (openid: string, id: number) {
    const whereOpt = {}
    if (openid) { Object.assign(whereOpt, { openid }) }
    if (id) { Object.assign(whereOpt, { id }) }
    if (!openid && !id) throw new ApiException(HttpStatusCode.BAD_REQUEST, '')
    return tb_driverModel.findOne({
      where: whereOpt
    })
  }
}

export default new DriverService()
