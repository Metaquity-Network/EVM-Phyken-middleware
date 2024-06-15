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

  @Prop({ required: true })
  nationality: string;

  @Prop({ required: true })
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

  @Prop({ default: Date.now, required: true })
  createdAt: Date;
}

export const WaitlistSchema = SchemaFactory.createForClass(Waitlist);
