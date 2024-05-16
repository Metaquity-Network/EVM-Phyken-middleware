import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from './user.schema';
import { WalletSchema } from 'src/wallet/wallet.schema';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { WalletService } from 'src/wallet/wallet.service';
import { Wallet } from 'ethers';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Wallet.name, schema: WalletSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.register({}),
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, WalletService],
})
export class UsersModule {}
