import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
  @Prop({ required: true, unique: true })
  address: string;

  @Prop()
  token: string;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
