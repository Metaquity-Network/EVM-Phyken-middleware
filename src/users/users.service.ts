import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/users/dto/user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: UserDto) {
    try {
      const createdUser = new this.userModel({
        ...user,
        firstLogin: new Date(),
        profileStatus: 'ACTIVE',
        kycStatus: 'PENDING',
      });
      return await createdUser.save();
    } catch (error) {
      throw new HttpException(
        'Error creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new HttpException(
        'Error fetching users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string) {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new HttpException(
        'Error fetching user by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserDetail(wallet: string) {
    try {
      return await this.userModel.findOne({ wallet: wallet });
    } catch (error) {
      throw new HttpException(
        'Error fetching user by email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(user: any, email: string) {
    try {
      return await this.userModel
        .findOneAndUpdate(
          {
            userEmail: email,
          },
          {
            $set: {
              userInfo: {
                ...user,
                address: {
                  ...user,
                },
              },
            },
          },
        )
        .exec();
    } catch (error) {
      throw new HttpException(
        'Error updating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
