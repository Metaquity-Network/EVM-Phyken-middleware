import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WaitlistDocument = Waitlist & Document;

@Schema()
export class Waitlist {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: false })
  nationality: string;

  @Prop({ required: false })
  investmentAmount: string;

  @Prop({ required: false })
  additionalInfo: string;

  @Prop({ default: false })
  receiveCommunications: boolean;

  @Prop({ required: true })
  agreeToStoreData: boolean;

  @Prop()
  verificationHash: string;

  @Prop()
  timestamp: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ unique: true })
  referralCode: string;

  @Prop()
  referredBy?: string;

  @Prop({ unique: true, required: false })
  walletAddress: string;

  @Prop({ unique: true, required: false })
  telegramId: string;

  @Prop({ unique: true, required: false })
  twitterId: string;

  @Prop({ default: Date.now, required: true })
  createdAt: Date;
}

export const WaitlistSchema = SchemaFactory.createForClass(Waitlist);
