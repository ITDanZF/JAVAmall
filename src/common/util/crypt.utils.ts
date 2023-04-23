import crypto from 'crypto'
import SECRET_KEY from '../constant/secret-key.constants'

function _md5 (content: string) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

export const doCrypto = (password: string): string => {
  const str = `password=${password}&key=${SECRET_KEY.CRYPTO_SECRET_KEY}`
  return _md5(str)
}
