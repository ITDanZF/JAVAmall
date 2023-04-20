import Router from '@koa/router'
import newsDriverRouters from './user/driverRegisterRouter'

const router = new Router({
  prefix: '/api'
})

router.use('', newsDriverRouters)


export default router.routes()
