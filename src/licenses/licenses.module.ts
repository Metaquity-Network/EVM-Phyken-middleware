import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LicensesService } from 'src/licenses/licenses.services';
import { Licenses, LicensesSchema } from 'src/licenses/licenses.schema';
import { LicensesController } from 'src/licenses/licenses.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { Wallet, WalletSchema } from 'src/wallet/wallet.schema';
import { WalletService } from 'src/wallet/wallet.service';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Licenses.name, schema: LicensesSchema },
      { name: Wallet.name, schema: WalletSchema },
      { name: User.name, schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [LicensesController],
  providers: [
    LicensesService,
    JwtService,
    AuthService,
    WalletService,
    UsersService,
  ],
})
export class LicensesModule {}
