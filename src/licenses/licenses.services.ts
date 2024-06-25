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

  async getAllLicenses(): Promise<Licenses[]> {
    return this.handleDbOperation(
      () => this.licensesModel.find().exec(),
      'fetching licenses',
    );
  }

  async uploadLicense(
    createdBy: string,
    licenseDto: LicensesDto,
  ): Promise<Licenses> {
    const licenseData: Licenses = {
      id: uuidv4(),
      ...licenseDto,
      licenseValidity: new Date(licenseDto.licenseValidity),
      licenseStatus: LicenseStatus.ACTIVE,
      createdAt: new Date(),
      createdBy,
    };

    const newLicense = new this.licensesModel(licenseData);
    return this.handleDbOperation(() => newLicense.save(), 'uploading license');
  }

  async getLicenseByUser(wallet: string): Promise<Licenses[]> {
    return this.handleDbOperation(
      () => this.licensesModel.find({ createdBy: wallet }).exec(),
      'fetching licenses by user',
    );
  }

  async verifyUploadedLicense(
    licenseID: string,
    wallet: string,
  ): Promise<Licenses[]> {
    return this.handleDbOperation(
      () =>
        this.licensesModel.find({ createdBy: wallet, id: licenseID }).exec(),
      'verifying uploaded license',
    );
  }

  private async handleDbOperation<T>(
    operation: () => Promise<T>,
    action: string,
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      console.error(`Error ${action}:`, error);
      if (error.code === 11000) {
        const duplicateKey = Object.keys(error.keyValue)[0];
        throw new HttpException(
          `Duplicate key error occurred while ${action}: ${duplicateKey.charAt(0).toUpperCase() + duplicateKey.slice(1)} already exists`,
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        `Database error occurred while ${action}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
