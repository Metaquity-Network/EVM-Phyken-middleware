import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Waitlist, WaitlistDocument } from './waitlist.schema';
import { WaitlistDto } from './dto/waitlist.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class WaitlistService {
  constructor(
    @InjectModel(Waitlist.name)
    private readonly waitlistModel: Model<WaitlistDocument>,
    private readonly mailService: MailService,
  ) {}

  async create(waitlistDto: WaitlistDto): Promise<Waitlist> {
    try {
      const createdInvestment = new this.waitlistModel(waitlistDto);
      const savedWaitlist = await createdInvestment.save();

      this.sendVerificationEmail(waitlistDto);
      return savedWaitlist;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      console.error('Failed to create waitlist entry:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  private async sendVerificationEmail(waitlistDto: WaitlistDto): Promise<void> {
    try {
      this.mailService.verifyWaitlistEmail({
        to: waitlistDto.email,
        firstName: waitlistDto.firstName,
        data: {
          hash: 'your-hash-value-here',
        },
      });
    } catch (error) {
      console.error('Error sending verification email:', error);
      // Optional: throw error if you want to handle it higher up the chain
      // throw error;
    }
    return;
  }
}
