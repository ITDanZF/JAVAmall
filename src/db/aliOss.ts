import OSS, { STS } from 'ali-oss'
import { KEYS } from '../common/configuration/config'

/**
 * 获取阿里云存储实例对象
 * @param sts
 * @constructor
 */
export const OssClient = (): OSS => {
  return new OSS({
    region: KEYS.region,
    accessKeyId: KEYS.AccessKeyID,
    accessKeySecret: KEYS.AccessKeySecret,
    bucket: KEYS.bucket,
    endpoint: `https://${KEYS.region}.aliyuncs.com`
  })
}

export const STSClient = (): STS => {
  return new STS({
    accessKeyId: KEYS.AccessKeyID,
    accessKeySecret: KEYS.AccessKeySecret
  })
}
