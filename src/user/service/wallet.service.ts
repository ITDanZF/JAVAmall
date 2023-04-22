import tb_walletModel from '../models/tb_wallet'
class WalletService {
  async inertIntoWallet (driver_id: number, balance: number, password: any) {
    return await tb_walletModel.create({
      driver_id,
      balance,
      password
    })
  }
}

export default new WalletService()
