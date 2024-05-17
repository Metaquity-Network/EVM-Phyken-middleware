import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { WalletModule } from '../wallet/wallet.module';
import { AuthGuard } from './guard/auth.guard';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/user.schema';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    WalletModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AuthService, JwtStrategy, AuthGuard, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
