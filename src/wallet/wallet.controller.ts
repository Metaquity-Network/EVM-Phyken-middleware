import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @ApiOperation({ summary: 'Get by wallet address' })
  @ApiResponse({ status: 200, description: 'Wallet found' })
  @ApiResponse({ status: 404, description: 'Wallet not found' })
  @Get(':address')
  async getWallet(@Param('address') address: string) {
    try {
      const wallet = await this.walletService.findOne(address);
      if (!wallet) {
        throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND);
      }
      return wallet;
    } catch (error) {
      throw new HttpException(
        error.message || 'An error occurred while fetching the wallet',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
