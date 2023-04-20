import Router from '@koa/router'
import { validateRegisterDriverInfo } from '../../../middleware/user/driver.middleware'
import DriverController from '../../../user/controller/driver.controller'

const router = new Router({
  prefix: '/user'
})

router.post(
  '/login',
  validateRegisterDriverInfo,
  DriverController.login
)

router.post(
  '/driverNewRegister',
  validateRegisterDriverInfo,
  DriverController.register
)
export default router.routes()
