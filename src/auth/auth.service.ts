import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ethers } from 'ethers';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
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

        const user = await this.usersService.findOne(address);
        if (user) {
          await this.usersService.update(address, token);
        } else {
          await this.usersService.create(address, token);
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
}
