import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet, WalletDocument } from './wallet.schema';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
  ) {}

  async findOne(address: string): Promise<Wallet | undefined> {
    try {
      const wallet = await this.walletModel.findOne({ address }).exec();
      if (!wallet) {
        return null;
      }
      return wallet;
    } catch (error) {
      throw new HttpException(
        error.message || 'An error occurred while fetching the wallet',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(address: string, token: string): Promise<Wallet> {
    try {
      const createdWallet = new this.walletModel({ address, token });
      return await createdWallet.save();
    } catch (error) {
      throw new HttpException(
        error.message || 'An error occurred while creating the wallet',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(address: string, token: string): Promise<Wallet> {
    try {
      const updatedWallet = await this.walletModel
        .findOneAndUpdate({ address }, { token }, { new: true })
        .exec();
      if (!updatedWallet) {
        throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND);
      }
      return updatedWallet;
    } catch (error) {
      throw new HttpException(
        error.message || 'An error occurred while updating the Wallet',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
