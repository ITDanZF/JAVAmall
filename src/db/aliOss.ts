import OSS from 'ali-oss'

/**
 * 获取阿里云存储实例对象
 * @param sts
 * @constructor
 */
export const OssClient = (sts: any): OSS => {
  const { AccessKeySecret, AccessKeyId, Bucket, Region } = sts
  return new OSS({
    region: Region,
    accessKeyId: AccessKeyId,
    accessKeySecret: AccessKeySecret,
    bucket: Bucket,
    endpoint: process.env.NODE_ENV === 'production' ? `${Region}-internal.aliyuncs.com` : `${Region}.aliyuncs.com`
  })
}
