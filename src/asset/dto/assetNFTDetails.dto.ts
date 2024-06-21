import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AssetNFTDetailsDto {
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The contract address of the NFT token',
    example: '0x122124134...',
  })
  tokenContract: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The unique identifier of the token within the contract',
    example: '1',
  })
  tokenID: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The transaction number of the token minting process',
    example: '0x122124134...',
  })
  tokenMintingTx: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The current owner of the NFT token',
    example: '0x122124134...',
  })
  nftOwner: string;
}
