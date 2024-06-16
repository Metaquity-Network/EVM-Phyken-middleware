import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Waitlist, WaitlistSchema } from './waitlist.schema';
import { WaitlistController } from './waitlist.controller';
import { WaitlistService } from './waitlist.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { WalletService } from 'src/wallet/wallet.service';
import { Wallet } from 'ethers';
import { WalletSchema } from 'src/wallet/wallet.schema';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/user.schema';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Waitlist.name, schema: WaitlistSchema },
      { name: Wallet.name, schema: WalletSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.register({}),
    AuthModule,
    MailModule,
  ],
  controllers: [WaitlistController],
  providers: [
    WaitlistService,
    JwtService,
    AuthService,
    WalletService,
    UsersService,
  ],
})
export class WaitlistModule {}
