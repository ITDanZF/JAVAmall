import { Context } from 'koa'
import UserService from '../service/user.service'
import {getToken} from "../../common/util/user.utils";
import {ApiException} from "../../common/exception/api.exception";
import HttpStatusCode from "../../common/constant/http-code.constants";
class UserController {
    /**
     * login
     * @param ctx
     */
    login = async (ctx: Context) => {
        const {  mobile, password } = ctx.loginUsersInfo

        const resData = await UserService.getUserInfo(mobile)
        if (!resData) {
            throw new ApiException(HttpStatusCode.BAD_REQUEST, 'the user is not exist!')
        }

        if (resData?.password !== password) {
            throw new ApiException(HttpStatusCode.BAD_REQUEST, 'password is not correct!')
        }
        const token = getToken({
            mobile
        })

        ctx.body = {
            status: 200,
            message: '用户登录成功',
            data: token
        }
    }

    /**
     * register
     * @param ctx
     */
    register = async (ctx: Context) => {
        const { nick, password, mobile } = ctx.registerUsersInfo

        await UserService.createUser({
            nick,
            password,
            mobile
        })

        ctx.body = {
            status: 200,
            message: '用户注册成功',
            data: ''
        }
    }
}

export default new UserController()
