import type { Sequelize } from "sequelize";
import { tb_driverModel as _tb_driver } from "./tb_driver.model";
import type { tb_driverAttributes, tb_driverCreationAttributes } from "./tb_driver.model";

export {
  _tb_driver as tb_driver,
};

export type {
  tb_driverAttributes,
  tb_driverCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const tb_driver = _tb_driver.initModel(sequelize);


  return {
    tb_driver: tb_driver,
  };
}
