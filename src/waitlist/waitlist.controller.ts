import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { WaitlistDto } from './dto/waitlist.dto';
import { WaitlistService } from './waitlist.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('waitlist')
@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new waitlist' })
  @ApiResponse({
    status: 201,
    description: 'The waitlist has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async create(@Body() createWaitlistDto: WaitlistDto) {
    return this.waitlistService.createWaitlist(createWaitlistDto);
  }

  @Get('verify')
  @ApiOperation({ summary: 'Verify email using hash' })
  @ApiQuery({
    name: 'hash',
    required: true,
    description: 'Hash for email verification',
  })
  @ApiResponse({
    status: 200,
    description: 'Email verified successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid or expired verification link',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async verifyEmail(@Query('hash') hash: string, @Res() res) {
    const isVerified = await this.waitlistService.verifyEmail(hash);
    if (isVerified) {
      return res.status(200).send('Email verified successfully');
    } else {
      return res.status(400).send('Invalid or expired verification link');
    }
  }
}
