import Joi from 'joi'

export const driverRegisterSchema = Joi.object({
  code: Joi.string().required().error(new Error('code不能为空！')),
  nickname: Joi.string().required().error(new Error('用户昵称不能为空')),
  photo: Joi.string().required().error(new Error('用户头像不能为空')),
})

export const userLoginSchema = Joi.object({
  mobile: Joi.string().length(11).required().error(new Error('mobile length must be 11')),
  password: Joi.string().required().min(6).max(18).error(new Error('用户密码为6-18位任意字符')),
})
