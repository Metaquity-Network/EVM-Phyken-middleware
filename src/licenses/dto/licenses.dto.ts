import { IsString, IsUrl, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LicensesDto {
  @ApiProperty({ example: 'Driver', description: 'Category of the license' })
  @IsString()
  category: string;

  @ApiProperty({
    example: 'USA',
    description: 'Country where the license is issued',
  })
  @IsString()
  country: string;

  @ApiProperty({ example: '12345', description: 'License number' })
  @IsString()
  licenseNumber: string;

  @ApiProperty({
    example: '2023-12-31',
    description: 'Validity date of the license',
  })
  @IsDateString()
  licenseValidity: string;

  @ApiProperty({
    example: 'California',
    description: 'State where the license is issued',
  })
  @IsString()
  state: string;

  @ApiProperty({
    example: 'https://example.com/license',
    description: 'URL of the license document',
  })
  @IsUrl()
  licenseURL: string;
}
