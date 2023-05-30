import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Media } from './Media';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Media, media => media.images)
  media: Media;
}
//