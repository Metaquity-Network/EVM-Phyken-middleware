import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AssetDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, example: 'assetName' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, example: 'assetCategory' })
  category: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, example: 'assetDescription' })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, example: 1000 })
  assetPrice: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, example: 'assetLicenseID' })
  licenseID: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, example: 'https://www.google.com/images/12' })
  assetImageURL: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, example: 'https://www.google.com/images/12' })
  assetContractURL: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, example: 'https://www.google.com/images/12' })
  orgStructureURL: string;
}
