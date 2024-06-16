import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('wallet')
@Controller('wallet')
@ApiBearerAuth()
@UseGuards(AuthGuard)
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
