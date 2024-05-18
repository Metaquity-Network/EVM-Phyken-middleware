import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsDate, IsUrl, IsEnum } from 'class-validator';
import { Document } from 'mongoose';

export type LicensesDocument = Licenses & Document;

enum LicenseStatus {
  ACTIVE = 'Active',
  EXPIRED = 'Expired',
  SUSPENDED = 'Suspended',
}

@Schema({ versionKey: false, timestamps: true })
export class Licenses {
  @Prop({ required: true })
  @IsString()
  id: string;

  @Prop({ required: true, unique: true })
  @IsString()
  licenseNumber: string;

  @Prop({ required: true })
  @IsString()
  category: string;

  @Prop({ required: true })
  @IsDate()
  licenseValidity: Date;

  @Prop({ required: true })
  @IsString()
  country: string;

  @Prop({ required: true })
  @IsString()
  state: string;

  @Prop()
  @IsUrl()
  licenseURL: string;

  @Prop({ required: true, enum: LicenseStatus })
  @IsEnum(LicenseStatus)
  licenseStatus: LicenseStatus;

  @Prop({ required: true })
  @IsDate()
  uploadedAt: Date;

  @Prop({ required: true })
  @IsString()
  createdBy: string;
}

export const LicensesSchema = SchemaFactory.createForClass(Licenses);

// Ensure `createdAt` and `updatedAt` are automatically managed by Mongoose
LicensesSchema.set('timestamps', true);
