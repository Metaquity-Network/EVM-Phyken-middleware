import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AssetService } from 'src/asset/asset.service';
import { AssetDto } from 'src/asset/dto/asset.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AssetNFTDetailsDto } from 'src/asset/dto/assetNFTDetails.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller({
  version: '1',
  path: 'asset',
})
@ApiBearerAuth()
@ApiTags('Asset')
@UseGuards(AuthGuard)
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post('uploadAsset')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Create new asset for the user' })
  @ApiResponse({
    status: 200,
    description: 'The asset has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: AssetDto })
  async addNewAsset(@Req() req: Request, @Body() assetDto: AssetDto) {
    const user = req['email'];
    return await this.assetService.addNewAsset(user, assetDto);
  }

  @Get('/getAssets')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all the assets under the user' })
  @ApiResponse({
    status: 200,
    description: 'List of assets retrieved successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  async getAllAssets(@Req() req: Request) {
    const user = req['email'];
    return await this.assetService.getAllAssets(user);
  }

  @Get('/getAssets/active')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all the active assets' })
  @ApiResponse({
    status: 200,
    description: 'List of active assets retrieved successfully.',
  })
  async getAllActiveAssets() {
    return await this.assetService.getAllActiveAssets();
  }

  @Get('/getAssetById/:id')
  @ApiOperation({ summary: 'Get a single asset by the user by asset Id' })
  @ApiResponse({
    status: 200,
    description: 'Asset details retrieved successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid asset ID.' })
  @HttpCode(HttpStatus.OK)
  async getAssetById(
    @Req() req: Request,
    @Param('id', new ParseUUIDPipe({ version: '4' })) assetId: string,
  ) {
    const user = req['email'];
    return await this.assetService.getAssetById(user, assetId);
  }

  @Post('/updateNFT')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update NFT details of an asset' })
  @ApiResponse({
    status: 200,
    description: 'NFT details updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiBody({ type: AssetNFTDetailsDto })
  async updateAssetNFTDetails(@Body() assetNFTDetailsDto: AssetNFTDetailsDto) {
    return await this.assetService.updateAssetNFTDetails(assetNFTDetailsDto);
  }
}
