import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetController } from 'src/asset/asset.controller';
import { AssetService } from 'src/asset/asset.service';
import { Asset, AssetSchema } from 'src/asset/asset.schema';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { LicensesService } from 'src/licenses/licenses.services';
import { Licenses, LicensesSchema } from 'src/licenses/licenses.schema';
import { Wallet, WalletSchema } from 'src/wallet/wallet.schema';
import { AuthService } from 'src/auth/auth.service';
import { WalletService } from 'src/wallet/wallet.service';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Asset.name,
        schema: AssetSchema,
      },
      { name: User.name, schema: UserSchema },
      { name: Wallet.name, schema: WalletSchema },
      { name: Licenses.name, schema: LicensesSchema },
    ]),
    AuthModule,
  ],
  controllers: [AssetController],
  providers: [
    AssetService,
    LicensesService,
    JwtService,
    AuthService,
    WalletService,
    UsersService,
  ],
})
export class AssetModule {}
