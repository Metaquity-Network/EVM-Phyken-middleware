import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AssetNFTDetailsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, example: 'nftID123' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, example: 'collectionID456' })
  nftCollectionID: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, example: 1 })
  nftItem: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, example: 'block123' })
  nftBlockMint: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, example: 'owner123' })
  nftOwner: string;
}
