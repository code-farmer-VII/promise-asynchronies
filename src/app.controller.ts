import { Controller, Put, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateItemDto } from './dto/item.dto';
import { UpdateUserDto } from './dto/user.dto';
import { UpdateLocationDto } from './dto/location.dto';

@Controller('update')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Put('all/:locationId')
  async updateAll(
    @Param('locationId') locationId: number,
    @Body() body: { item: UpdateItemDto, user: UpdateUserDto, location: UpdateLocationDto },
  ) {
    const { item, user, location } = body;

    return this.appService.updateAll(locationId, item, user, location);
  }
}
