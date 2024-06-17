import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { Wallet, WalletSchema } from './wallet.schema';
import { Waitlist, WaitlistSchema } from 'src/waitlist/waitlist.schema';
import { User, UserSchema } from 'src/users/user.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { WaitlistService } from 'src/waitlist/waitlist.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Wallet.name, schema: WalletSchema },
      { name: Waitlist.name, schema: WaitlistSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.register({}),
    MailModule,
  ],
  providers: [
    WalletService,
    WaitlistService,
    JwtService,
    AuthService,
    UsersService,
  ],
  controllers: [WalletController],
  exports: [WalletService],
})
export class WalletModule {}
