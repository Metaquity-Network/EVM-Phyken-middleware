import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetController } from 'src/asset/asset.controller';
import { AssetService } from 'src/asset/asset.service';
import { AssetSchema } from 'src/asset/asset.schema';
import { UploadService } from 'src/upload/upload.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { AuthSchema } from 'src/auth/entity/auth.entity';
import { LicensesSchema } from 'src/licenses/entity/licenses.entity';
import { LicensesService } from 'src/licenses/licenses.services';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'asset',
        schema: AssetSchema,
      },
      { name: 'auth', schema: AuthSchema },
      { name: 'licenses', schema: LicensesSchema },
    ]),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        maxRedirects: configService.getOrThrow('HTTP_MAX_REDIRECTS'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AssetController],
  providers: [AssetService, UploadService, JwtService, LicensesService],
})
export class AssetModule {}
