import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { Media } from 'src/entities/Media';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([Media])] ,
  providers: [MediaService],
  controllers: [MediaController]
})
export class MediaModule {}
