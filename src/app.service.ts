import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entity/item.entity';
import { User } from './entity/user.entity';
import { Location } from './entity/location.entity';
import { UpdateItemDto } from './dto/item.dto';
import { UpdateUserDto } from './dto/user.dto';
import { UpdateLocationDto } from './dto/location.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async updateAll(
    locationId: number,
    itemDto: UpdateItemDto,
    userDto: UpdateUserDto,
    locationDto: UpdateLocationDto,
  ): Promise<Location> {
    
    return new Promise<Location>((resolve, reject) => {

      const itemUpdatePromise = this.itemRepository.upsert(itemDto, ['id']);
      const userUpdatePromise = this.userRepository.upsert(userDto, ['id']);

      Promise.all([itemUpdatePromise, userUpdatePromise])
        .then(() => {
          return this.locationRepository.upsert(locationDto, ['id']);
        })
        .then(() => {
          return this.locationRepository.findOneBy({ id: locationId });
        })
        .then((location) => {
          if (location) {
            resolve(location);
          } else {
            reject(new Error('Location not found'));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}