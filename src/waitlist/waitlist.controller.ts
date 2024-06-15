import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { WaitlistDto } from './dto/waitlist.dto';
import { WaitlistService } from './waitlist.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('waitlist')
@ApiBearerAuth()
@Controller('waitlist')
@UseGuards(AuthGuard('jwt'))
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
  async create(@Body() createWaitlistDto: WaitlistDto) {
    return this.waitlistService.create(createWaitlistDto);
  }
}
