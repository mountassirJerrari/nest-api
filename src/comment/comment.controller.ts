import { Controller, Get, Post, Body,Request, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  getAllComments() {
    return this.commentService.getAllComments();
  }

  @Get(':id')
  getCommentById(@Param('id') id: number) {
    return this.commentService.getCommentById(id);
  }
  @UseGuards(AuthGuard)
  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto , @Request() req) {
    createCommentDto.userId =  req.user.sub;
    return this.commentService.createComment(createCommentDto);
  }

  @Put(':id')
  updateComment(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.updateComment(id, updateCommentDto);
  }

  @Delete(':id')
  deleteComment(@Param('id') id: number) {
    return this.commentService.deleteComment(id);
  }
}
