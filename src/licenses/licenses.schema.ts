import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsDate, IsUrl, IsEnum, IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export type LicensesDocument = Licenses & Document;

export enum LicenseStatus {
  ACTIVE = 'Active',
  EXPIRED = 'Expired',
  SUSPENDED = 'Suspended',
}

@Schema({ versionKey: false, timestamps: true })
export class Licenses {
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  id: string;

  @Prop({ required: true, unique: true })
  @IsString()
  @IsNotEmpty()
  licenseNumber: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  category: string;

  @Prop({ required: true })
  @IsDate()
  @IsNotEmpty()
  licenseValidity: Date;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  country: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  state: string;

  @Prop()
  @IsUrl()
  licenseURL: string;

  @Prop({ required: true, enum: LicenseStatus })
  @IsEnum(LicenseStatus)
  licenseStatus: LicenseStatus;

  @Prop({ default: Date.now() })
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  createdBy: string;
}

export const LicensesSchema = SchemaFactory.createForClass(Licenses);
