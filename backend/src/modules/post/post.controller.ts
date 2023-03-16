import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { multerFilter } from '../../config/multer';

import { RequestData } from '../../decorators/requestData.decorator';

import { PostService } from './post.service';

import { CreatePostDto } from '../../dto/CreatePostDto';

import IToken from '../../interfaces/IToken';
import IPost from '../../interfaces/IPost';

@Controller('/posts')
@ApiTags('Posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: 'Create post' })
  @ApiConsumes('multipart/form-data')
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiResponse({ status: 201, description: 'Post created' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image', multerFilter))
  createUser(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
      }),
    )
    file: Express.Multer.File,
    @Body()
    createPostDto: CreatePostDto,
    @RequestData('userDataFromToken') tokenData: IToken,
  ) {
    return this.postService.createPost(createPostDto, file.filename, tokenData);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete post by id' })
  @ApiResponse({ status: 204, description: 'Post deleted' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  deleteUser(@RequestData('post') post: IPost) {
    return this.postService.deletePost(post);
  }
}
