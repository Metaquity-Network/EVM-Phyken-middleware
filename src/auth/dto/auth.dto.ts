import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: '0x1234...' })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: '0x5678...' })
  @IsNotEmpty()
  signature: string;

  @ApiProperty({ example: 'INVESTOR' })
  @IsNotEmpty()
  userType: string;
}
