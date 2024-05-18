import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LicensesDto } from 'src/licenses/dto/licenses.dto';
import { v4 as uuidv4 } from 'uuid';
import { Licenses, LicensesDocument } from 'src/licenses/licenses.schema';

enum LicenseStatus {
  ACTIVE = 'Active',
  EXPIRED = 'Expired',
  SUSPENDED = 'Suspended',
}

@Injectable()
export class LicensesService {
  constructor(
    @InjectModel(Licenses.name) private licensesModel: Model<LicensesDocument>,
  ) {}

  async getAllLicenses(): Promise<Licenses[] | []> {
    try {
      const licenses = await this.licensesModel.find().exec();
      if (!licenses) {
        return licenses;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching licenses:', error);
      throw new HttpException(
        'Error fetching licenses',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async uploadLicense(
    createdBy: string,
    licenseDto: LicensesDto,
  ): Promise<Licenses> {
    const licenseData = {
      id: uuidv4(),
      ...licenseDto,
      licenseValidity: new Date(licenseDto.licenseValidity),
      licenseStatus: LicenseStatus.ACTIVE,
      uploadedAt: new Date(),
      createdAt: new Date(),
      createdBy: createdBy,
    };

    try {
      const newLicense = new this.licensesModel(licenseData);
      return await newLicense.save();
    } catch (error) {
      console.error('Error uploading license:', error);
      throw new HttpException(
        'Error uploading license',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getLicenseByUser(wallet: string): Promise<Licenses | []> {
    try {
      const userLicenses = await this.licensesModel
        .findOne({ createdBy: wallet })
        .exec();
      if (!userLicenses) {
        return userLicenses;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching license by user:', error);
      throw new HttpException(
        'Error fetching license by user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
