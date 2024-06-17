import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// import { IsGreaterThan } from './isGreaterThanConstraint';

export class WaitlistDto {
  @ApiProperty({ description: 'The email of the investor' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The first name of the investor' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'The last name of the investor' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional({ description: 'The nationality of the investor' })
  @IsString()
  @IsOptional()
  nationality?: string;

  @ApiProperty({ description: 'The amount the investor plans to invest' })
  @IsString()
  @IsOptional()
  // @IsGreaterThan({ message: 'Investment amount must be greater than 100' })
  investmentAmount: string;

  @ApiPropertyOptional({
    description: 'Additional information provided by the investor',
  })
  @IsString()
  @IsOptional()
  additionalInfo?: string;

  @ApiPropertyOptional({
    description: 'Whether the investor agrees to receive communications',
  })
  @IsBoolean()
  @IsOptional()
  receiveCommunications?: boolean;

  @ApiProperty({ description: 'Consent to store and process personal data' })
  @IsBoolean()
  @IsNotEmpty()
  agreeToStoreData: boolean;

  @ApiProperty({ description: '0x123....' })
  @IsString()
  @IsOptional()
  walletAddress: string;

  @ApiProperty({ description: '@telegram' })
  @IsString()
  @IsOptional()
  telegramId: string;

  @ApiProperty({ description: '@twitter' })
  @IsString()
  @IsOptional()
  twitterId: string;

  @ApiProperty({ description: 'Referral code' })
  @IsOptional()
  @IsString()
  referralCode?: string;
}
