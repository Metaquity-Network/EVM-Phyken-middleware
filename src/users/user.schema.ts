import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class IdentityDetails {
  @Prop({ required: true })
  identityContract: string;

  @Prop({ required: true })
  transactionHash: string;
}

export const IdentityDetailsSchema =
  SchemaFactory.createForClass(IdentityDetails);

@Schema()
export class User {
  @Prop({ required: true })
  wallet: string;

  @Prop({ type: IdentityDetailsSchema, required: false })
  identityDetails: IdentityDetails;

  @Prop({ required: false })
  firstName: string;

  @Prop({ required: false })
  lastName: string;

  @Prop({ required: false, type: Date })
  dateOfBirth: Date;

  @Prop({
    required: false,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  })
  emailAddress: string;

  @Prop({ required: false })
  typeOfIdentification: string;

  @Prop({ required: false })
  identificationNumber: string;

  @Prop({ required: false })
  passportCountry: string;

  @Prop({ required: false })
  residentCountry: string;

  @Prop({ required: false, type: Date })
  firstLogin: Date;

  @Prop({ required: false, type: Date })
  lastLogin: Date;

  @Prop({ required: false })
  profileStatus: string;

  @Prop({ required: false })
  kycStatus: string;

  @Prop({ required: true })
  userType: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
