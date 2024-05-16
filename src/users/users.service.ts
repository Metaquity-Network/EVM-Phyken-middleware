import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(address: string): Promise<User | undefined> {
    return this.userModel.findOne({ address }).exec();
  }

  async create(address: string, token: string): Promise<User> {
    const createdUser = new this.userModel({ address, token });
    return createdUser.save();
  }

  async update(address: string, token: string): Promise<User> {
    return this.userModel
      .findOneAndUpdate({ address }, { token }, { new: true })
      .exec();
  }
}
