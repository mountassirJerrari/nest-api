import { Module } from '@nestjs/common';
import { UtilsController } from './utils.controller';
import { UtilsService } from './utils.service';
import { Utils } from 'src/entities/Utils';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([Utils])] ,
  controllers: [UtilsController],
  providers: [UtilsService]
})
export class UtilsModule {}
