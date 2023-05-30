import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/Comment';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async getAllComments() {
    return this.commentRepository.find();
  }

  async getCommentById(id: number) {
    const comment = await this.commentRepository.findOneBy({id});
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async createComment(createCommentDto: CreateCommentDto) {
    const newComment = this.commentRepository.create(createCommentDto);
    return this.commentRepository.save(newComment);
  }

  async updateComment(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.getCommentById(id);
    this.commentRepository.merge(comment, updateCommentDto);
    return this.commentRepository.save(comment);
  }

  async deleteComment(id: number) {
    const comment = await this.getCommentById(id);
    return this.commentRepository.remove(comment);
  }
}
