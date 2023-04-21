import tb_driver_settingsModel from '../models/tb_driver_settings'
class Driver_settingsService {
  /**
   * 插入或更新一条数据
   * @param id
   * @param driver_id
   * @param settings
   */
  async newDriverSetting (driver_id: number, settings: Object) {
    return await tb_driver_settingsModel.create({
      driver_id,
      settings
    })
  }
}

export default new Driver_settingsService()
