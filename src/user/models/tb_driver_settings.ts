import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface tb_driver_settingsAttributes {
  id: number
  driver_id: number
  settings: object
}

export type tb_driver_settingsPk = 'id'
export type tb_driver_settingsId = tb_driver_settings[tb_driver_settingsPk]
export type tb_driver_settingsCreationAttributes = tb_driver_settingsAttributes

export default class tb_driver_settings extends Model {
  id!: number
  driver_id!: number
  settings!: object

  static initModel (sequelize: Sequelize.Sequelize): typeof tb_driver_settings {
    return tb_driver_settings.init({
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键'
      },
      driver_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        comment: '司机ID',
        unique: 'idx_driver_id'
      },
      settings: {
        type: DataTypes.JSON,
        allowNull: false,
        comment: '个人设置'
      }
    }, {
      sequelize,
      tableName: 'tb_driver_settings',
      timestamps: false,
      freezeTableName: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'id' },
          ]
        },
        {
          name: 'idx_driver_id',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'driver_id' },
          ]
        },
      ]
    })
  }
}
