import Router from '@koa/router'
import ApiRoutes from './api/index'

const router = new Router()

router.use('', ApiRoutes)

export default router
