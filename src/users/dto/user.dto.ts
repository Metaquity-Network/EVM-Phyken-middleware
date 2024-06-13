import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'User address', required: true })
  @IsNotEmpty()
  @IsString()
  wallet: string;

  @ApiProperty({ description: 'First name of the user', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ description: 'Last name of the user', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    description: 'Date of birth of the user',
    required: false,
    type: Date,
  })
  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @ApiProperty({ description: 'Email address of the user', required: false })
  @IsOptional()
  @IsEmail()
  emailAddress: string;

  @ApiProperty({ description: 'INVESTOR', required: false })
  @IsOptional()
  @IsString()
  userType: string;

  @ApiProperty({
    description: 'Type of identification document',
    required: false,
  })
  @IsOptional()
  @IsString()
  typeOfIdentification?: string;

  @ApiProperty({ description: 'Identification number', required: false })
  @IsOptional()
  @IsString()
  identificationNumber?: string;

  @ApiProperty({ description: 'Country of passport issuance', required: false })
  @IsOptional()
  @IsString()
  passportCountry?: string;

  @ApiProperty({ description: 'Country of residence', required: false })
  @IsOptional()
  @IsString()
  residentCountry?: string;

  @ApiProperty({ description: 'First login date', required: false, type: Date })
  @IsOptional()
  @IsDate()
  firstLogin?: Date;

  @ApiProperty({ description: 'Last login date', required: false, type: Date })
  @IsOptional()
  @IsDate()
  lastLogin?: Date;

  @ApiProperty({ description: 'Profile status', required: false })
  @IsOptional()
  @IsString()
  profileStatus?: string;

  @ApiProperty({ description: 'KYC status', required: false })
  @IsOptional()
  @IsString()
  kycStatus?: string;
}
