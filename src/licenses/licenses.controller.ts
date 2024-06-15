import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { LicensesDto } from 'src/licenses/dto/licenses.dto';
import { LicensesService } from 'src/licenses/licenses.services';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller({
  path: 'licenses',
})
@ApiBearerAuth()
@ApiTags('Licenses')
@UseGuards(AuthGuard('jwt'))
export class LicensesController {
  constructor(private licensesServices: LicensesService) {}

  @Post('uploadLicense')
  @ApiOperation({ summary: 'Upload new License' })
  @ApiBody({
    type: LicensesDto,
    description: 'Details of the license to be uploaded',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'License successfully uploaded',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data or upload failed',
  })
  @HttpCode(HttpStatus.OK)
  async uploadLicense(@Req() req: Request, @Body() licensesDto: any) {
    const wallet = req['wallet'];

    try {
      const result = await this.licensesServices.uploadLicense(
        wallet,
        licensesDto,
      );
      return result;
    } catch (error) {
      console.error('Upload License Error:', error);
      throw new BadRequestException(error.message);
    }
  }

  @Get('getLicenses')
  @ApiOperation({ summary: 'Get all licenses' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved all licenses',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          /* define your properties here */
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed to retrieve licenses',
  })
  @HttpCode(HttpStatus.OK)
  async getLicense(@Req() req: Request) {
    try {
      const wallet = req['wallet'];
      return await this.licensesServices.getLicenseByUser(wallet);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
