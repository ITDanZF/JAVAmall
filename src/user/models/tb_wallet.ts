import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface tb_walletAttributes {
  id: number
  driver_id: number
  balance: number
  password?: string
}

export type tb_walletPk = 'id'
export type tb_walletId = tb_wallet[tb_walletPk]
export type tb_walletOptionalAttributes = 'password'
export type tb_walletCreationAttributes = Optional<tb_walletAttributes, tb_walletOptionalAttributes>

export default class tb_wallet extends Model {
  id!: number
  driver_id!: number
  balance!: number
  password?: string

  static initModel (sequelize: Sequelize.Sequelize): typeof tb_wallet {
    return tb_wallet.init({
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
      balance: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        comment: '钱包金额'
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: '支付密码，如果为空，不能支付，提示用户设置支付密码'
      }
    }, {
      sequelize,
      tableName: 'tb_wallet',
      timestamps: false,
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
