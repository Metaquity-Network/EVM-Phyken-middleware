import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserDto } from './dto/user.dto';
import { Request } from 'express';

@Controller({
  path: 'user',
})
@ApiBearerAuth()
@ApiTags('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('createUser')
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 200, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(HttpStatus.OK)
  async create(@Body() userDto: UserDto) {
    return await this.usersService.create(userDto);
  }

  @Post('updateUserEmail')
  @ApiOperation({ summary: 'Update user email' })
  @ApiResponse({
    status: 200,
    description: 'User email updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(HttpStatus.OK)
  async updateUser(@Req() req: Request, @Body() userUpdateDto: any) {
    const wallet = req['wallet'];
    return await this.usersService.updateUserEmail(userUpdateDto.email, wallet);
  }

  @Post('updateUserDetails')
  @ApiOperation({ summary: 'Update user details' })
  @ApiResponse({
    status: 200,
    description: 'User details updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(HttpStatus.OK)
  async updateUserDetails(@Req() req: Request, @Body() userUpdateDto: any) {
    const wallet = req['wallet'];
    return await this.usersService.updateUserDetails(userUpdateDto, wallet);
  }

  @Get()
  @ApiOperation({ summary: 'Get user details' })
  @ApiResponse({
    status: 200,
    description: 'User details retrieved successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(HttpStatus.OK)
  async getUserDetail(@Req() req: Request) {
    const wallet = req['wallet'];
    return await this.usersService.getUserDetail(wallet);
  }
}
