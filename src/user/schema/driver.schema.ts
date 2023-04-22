import Joi from 'joi'

export const driverRegisterSchema = Joi.object({
  code: Joi.string().required().error(new Error('code不能为空！')),
  nickname: Joi.string().required().error(new Error('用户昵称不能为空')),
  photo: Joi.string().required().error(new Error('用户头像不能为空')),
})

export const driverLoginSchema = Joi.object({
  code: Joi.string().required().error(new Error('code不能为空！')),
})
