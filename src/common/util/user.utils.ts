import { TokenUserInfo } from '../../user/dto/user.dto'
import jwt, { sign } from 'jsonwebtoken'
import SECRET_KEY from '../constant/secret-key.constants'

import axios from 'axios'
import {ApiException} from "../exception/api.exception";
import HttpStatusCode from "../constant/http-code.constants";

export const token2UserInfo = (token: string): any => {
  if (!token) return null
  return jwt.verify(token, SECRET_KEY.CRYPTO_SECRET_KEY)
}

export const getToken = (dto: TokenUserInfo, time: string = '2h'): string => {
  const { id } = dto
  return sign({
    id
  }, SECRET_KEY.CRYPTO_SECRET_KEY, {
    expiresIn: time
  })
}

export const getOpenId = async (code: string): Promise<any> => {
  const result = await axios({
    method: 'get',
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    params: {
      js_code: code,
      appid: SECRET_KEY.appid,
      secret: SECRET_KEY.secret,
      grant_type: SECRET_KEY.grant_type
    }
  })
  if (!result.data.openid) { throw new ApiException(HttpStatusCode.BAD_REQUEST, '临时登陆凭证错误') }
  return result.data
}
