import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Waitlist, WaitlistDocument } from './waitlist.schema';
import { WaitlistDto } from './dto/waitlist.dto';

@Injectable()
export class WaitlistService {
  constructor(
    @InjectModel(Waitlist.name)
    private investmentModel: Model<WaitlistDocument>,
  ) {}

  async create(waitlistDto: WaitlistDto): Promise<Waitlist> {
    try {
      const createdInvestment = new this.investmentModel(waitlistDto);
      return await createdInvestment.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }
}
