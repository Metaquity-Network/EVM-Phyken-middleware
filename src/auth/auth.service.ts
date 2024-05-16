import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ethers } from 'ethers';
import { WalletService } from '../wallet/wallet.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly walletService: WalletService,
    private readonly userService: UsersService,
  ) {}

  async validateWallet(
    address: string,
    signature: string,
  ): Promise<string | null> {
    const message = `Sign this message to authenticate with Phyken. Address: ${address}`;
    try {
      const recoveredAddress = ethers.verifyMessage(message, signature);
      if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
        const token = this.jwtService.sign({ address });

        const wallet = await this.walletService.findOne(address);
        if (wallet) {
          await this.walletService.update(address, token);
        } else {
          await this.walletService.create(address, token);
          await this.userService.create({
            wallet: address,
            emailAddress: '',
          });
        }
        return token;
      } else {
        this.logger.warn(
          `Address mismatch: expected ${address}, got ${recoveredAddress}`,
        );
        throw new HttpException('Invalid signature', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      this.logger.error(
        `Error during wallet validation: ${error.message}`,
        error.stack,
      );

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const decoded = this.jwtService.verify(token);
      return !!decoded;
    } catch (error) {
      return false;
    }
  }
}
