import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AssetDto } from 'src/asset/dto/asset.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AssetSchema } from 'src/asset/asset.schema';
import mongoose, { Model } from 'mongoose';
import { LicensesService } from 'src/licenses/licenses.services';
import { v4 as uuidv4 } from 'uuid';
import { AssetNFTDetailsDto } from 'src/asset/dto/assetNFTDetails.dto';

@Injectable()
export class AssetService {
  constructor(
    @InjectModel('asset') private assetModel: Model<AssetSchema>,
    private licensesServices: LicensesService,
  ) {}

  async addNewAsset(userEmail: string, assetDto: AssetDto) {
    try {
      const licenses = await this.licensesServices.getLicenseByUser(
        assetDto.licenseID,
        userEmail,
      );
      if (!licenses) {
        throw new HttpException('Invalid License Id', HttpStatus.BAD_REQUEST);
      }

      const createdAsset = await this.assetModel.create({
        id: uuidv4().toString(),
        ...assetDto,
        createdBy: userEmail,
        assetStatus: 'PENDING',
        //TODO: remove this
        tags: ['New', 'Asset'],
        totalValue: 1200000,
        lockedValue: 1000000,
        fixedRate: 9.7,
        lockPeriod: 6,
        minimumInvestment: 10000,
        dealValue: 1200000,
      });
      return createdAsset;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllAssets(email: string) {
    try {
      return await this.assetModel.find({});
    } catch (error) {
      throw new HttpException(
        'Error fetching assets',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllActiveAssets() {
    try {
      return await this.assetModel.find({
        assetStatus: 'ACTIVE',
      });
    } catch (error) {
      throw new HttpException(
        'Error fetching assets',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAssetById(email: any, assetId: string) {
    if (!assetId) {
      throw new NotFoundException('Asset not found');
    }
    try {
      return await this.assetModel.findOne({ id: assetId });
    } catch (error) {
      throw new HttpException(
        'Error fetching asset by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateAssetNFTDetails(assetNFTDetailsDto: AssetNFTDetailsDto) {
    if (!assetNFTDetailsDto.nftBlockMint) {
      throw new NotFoundException('Asset not found');
    }
    try {
      const objectId = new mongoose.Types.ObjectId(assetNFTDetailsDto.id);
      return await this.assetModel
        .findByIdAndUpdate(
          { _id: objectId },
          {
            $set: {
              nftDetails: {
                ...assetNFTDetailsDto,
                createdAt: new Date(),
              },
            },
          },
          { new: true },
        )
        .exec();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error fetching asset by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
