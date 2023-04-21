import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface tb_driverAttributes {
  id: number
  open_id: string
  nickname: string
  name?: string
  sex?: string
  photo?: string
  pid?: string
  birthday?: string
  tel?: string
  email?: string
  mail_address?: string
  contact_name?: string
  contact_tel?: string
  real_auth?: number
  idcard_address?: string
  idcard_expiration?: string
  idcard_front?: string
  idcard_back?: string
  idcard_holding?: string
  drcard_type?: string
  drcard_expiration?: string
  drcard_issue_date?: string
  drcard_front?: string
  drcard_back?: string
  drcard_holding?: string
  home?: object
  summary?: object
  archive: number
  status: number
  create_time: Date
}

export type tb_driverPk = 'id'
export type tb_driverId = tb_driverModel[tb_driverPk]
export type tb_driverOptionalAttributes = 'name' | 'sex' | 'photo' | 'pid' | 'birthday' | 'tel' | 'email' | 'mail_address' | 'contact_name' | 'contact_tel' | 'real_auth' | 'idcard_address' | 'idcard_expiration' | 'idcard_front' | 'idcard_back' | 'idcard_holding' | 'drcard_type' | 'drcard_expiration' | 'drcard_issue_date' | 'drcard_front' | 'drcard_back' | 'drcard_holding' | 'home' | 'summary' | 'create_time'
export type tb_driverCreationAttributes = Optional<tb_driverAttributes, tb_driverOptionalAttributes>

export default class tb_driverModel extends Model {
  id!: number
  open_id!: string
  nickname!: string
  name?: string
  sex?: string
  photo?: string
  pid?: string
  birthday?: string
  tel?: string
  email?: string
  mail_address?: string
  contact_name?: string
  contact_tel?: string
  real_auth?: number
  idcard_address?: string
  idcard_expiration?: string
  idcard_front?: string
  idcard_back?: string
  idcard_holding?: string
  drcard_type?: string
  drcard_expiration?: string
  drcard_issue_date?: string
  drcard_front?: string
  drcard_back?: string
  drcard_holding?: string
  home?: object
  summary?: object
  archive!: number
  status!: number
  create_time!: Date

  static initModel (sequelize: Sequelize.Sequelize): typeof tb_driverModel {
    return tb_driverModel.init({
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键'
      },
      open_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: '小程序长期授权',
        unique: 'unq_open_id'
      },
      nickname: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: '昵称'
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: '姓名'
      },
      sex: {
        type: DataTypes.CHAR(1),
        allowNull: true,
        comment: '性别'
      },
      photo: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: '头像'
      },
      pid: {
        type: DataTypes.STRING(18),
        allowNull: true,
        comment: '身份证号码',
        unique: 'unq_pid'
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: '生日'
      },
      tel: {
        type: DataTypes.CHAR(11),
        allowNull: true,
        comment: '电话'
      },
      email: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: '邮箱'
      },
      mail_address: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: '收信地址'
      },
      contact_name: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: '应急联系人'
      },
      contact_tel: {
        type: DataTypes.CHAR(11),
        allowNull: true,
        comment: '应急联系人电话'
      },
      real_auth: {
        type: DataTypes.TINYINT,
        allowNull: true,
        comment: '1未认证，2已认证，3审核中'
      },
      idcard_address: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: '身份证地址'
      },
      idcard_expiration: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: '身份证有效期'
      },
      idcard_front: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: '身份证正面'
      },
      idcard_back: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: '身份证背面'
      },
      idcard_holding: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: '手持身份证'
      },
      drcard_type: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: '驾驶证类型'
      },
      drcard_expiration: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: '驾驶证有效期'
      },
      drcard_issue_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: '驾驶证初次领证日期'
      },
      drcard_front: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: '驾驶证正面'
      },
      drcard_back: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: '驾驶证背面'
      },
      drcard_holding: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: '手持驾驶证'
      },
      home: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: '家庭地址，包含地址和定位，用于回家导航'
      },
      summary: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: '摘要信息，level等级，totalOrder接单数，weekOrder周接单，weekComment周好评，appeal正在申诉量'
      },
      archive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        comment: '是否在腾讯云归档存放司机面部信息'
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: '状态，1正常，2禁用，3.降低接单量'
      },
      create_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: '注册时间'
      }
    }, {
      sequelize,
      tableName: 'tb_driver',
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
          name: 'unq_open_id',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'open_id' },
          ]
        },
        {
          name: 'unq_pid',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'pid' },
          ]
        },
        {
          name: 'idx_real_auth',
          using: 'BTREE',
          fields: [
            { name: 'real_auth' },
          ]
        },
        {
          name: 'idx_status',
          using: 'BTREE',
          fields: [
            { name: 'status' },
          ]
        },
      ]
    })
  }
}
