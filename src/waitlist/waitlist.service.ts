import { Injectable } from '@nestjs/common';
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

  async create(createInvestmentDto: WaitlistDto): Promise<Waitlist> {
    const createdInvestment = new this.investmentModel(createInvestmentDto);
    return createdInvestment.save();
  }
}
