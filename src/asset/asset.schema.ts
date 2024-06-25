import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssetDocument = Asset & Document;

@Schema()
export class NftDetails {
  @Prop({ required: true })
  tokenContract: string;

  @Prop({ required: true })
  tokenID: string;

  @Prop({ required: true })
  tokenMintingTx: string;

  @Prop({ required: true })
  nftOwner: string;

  @Prop({ default: new Date() })
  createdAt: string;

  @Prop({ required: true })
  createdBy: string;
}

export const NftDetailsSchema = SchemaFactory.createForClass(NftDetails);

@Schema()
export class NftFractionalizationDetails {
  @Prop({ required: true })
  nftCollectionID: string;

  @Prop({ required: true })
  nftItem: string;

  @Prop({ required: true })
  fractionalizationAssetID: string;

  @Prop({ required: true })
  fractionalizationBlockMint: string;

  @Prop({ required: true })
  fractionalization: string;

  @Prop({ required: true })
  fractionalizationPrice: string;

  @Prop({ required: true })
  createdAt: string;
}

export const NftFractionalizationDetailsSchema = SchemaFactory.createForClass(
  NftFractionalizationDetails,
);

@Schema({ versionKey: false })
export class Asset {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  assetImageURL: string;

  @Prop({ required: true })
  assetContractURL: string;

  @Prop({ required: true })
  orgStructureURL: string;

  @Prop({ required: true })
  assetPrice: string;

  @Prop({ required: true })
  assetStatus: string;

  @Prop({ required: true })
  licenseID: string;

  @Prop({ type: NftDetailsSchema, required: false })
  nftDetails: NftDetails;

  @Prop({ type: NftFractionalizationDetailsSchema, required: false })
  nftFractionalizationDetails: NftFractionalizationDetails;

  @Prop({ default: new Date(), required: true })
  createdAt: string;

  @Prop({ required: true })
  createdBy: string;

  @Prop()
  tags: string[];

  @Prop()
  totalValue: string;

  @Prop()
  lockedValue: string;

  @Prop()
  fixedRate: string;

  @Prop()
  lockPeriod: string;

  @Prop()
  minimumInvestment: string;

  @Prop()
  dealValue: string;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
