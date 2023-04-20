import Joi from 'joi'

export const userRegisterSchema = Joi.object({
    nick: Joi.string().required().alphanum().min(6).max(11).error(new Error("输入登录账号格式有误！")),
    mobile: Joi.string().length(11).required().error(new Error('mobile length must be 11')),
    password: Joi.string().required().min(6).max(18).error(new Error("用户密码为6-18位任意字符")),
})


export const userLoginSchema = Joi.object({
    mobile: Joi.string().length(11).required().error(new Error('mobile length must be 11')),
    password: Joi.string().required().min(6).max(18).error(new Error("用户密码为6-18位任意字符")),
})