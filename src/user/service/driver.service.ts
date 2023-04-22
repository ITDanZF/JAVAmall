import { isEmpty } from 'lodash'
import {Op} from 'sequelize'
import HttpStatusCode from '../../common/constant/http-code.constants'
import { ApiException } from '../../common/exception/api.exception'
import tb_driverModel from '../models/tb_driver.model'
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
    if (openid) { Object.assign(whereOpt, { open_id: openid }) }
    if (id) { Object.assign(whereOpt, { id }) }
    if (!openid && !id) throw new ApiException(HttpStatusCode.BAD_REQUEST, '')
    return tb_driverModel.findOne({
      where: whereOpt
    })
  }

  /**
   * 查询用户是否完成登录
   * @param openid
   */
  async selectLoginDriverByOpenId (openid: string) {
    return tb_driverModel.findOne({
      attributes: ['id', 'real_auth', 'archive'],
      where: {
        status: {
          [Op.ne]: 2 //  不等于2
        },
        open_id: openid
      }
    })
  }

  async insertDriverInfo (openid: string, photo: string, nickname: string) {
    return tb_driverModel.create({
      open_id: openid,
      photo,
      nickname,
      status: 1,
      summary: '{"level":0,"totalOrder":0,"weekOrder":0,"weekComment":0,"appeal":0}',
      archive: false,
      real_auth: 1
    })
  }
}

export default new DriverService()
