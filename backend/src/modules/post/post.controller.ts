import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
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
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { multerFilter } from '../../config/multer';

import { RequestData } from '../../decorators/requestData.decorator';

import { PostService } from './post.service';

import { CreatePostDto } from '../../dto/post.dto';

import IToken from '../../interfaces/IToken';
import IPost from '../../interfaces/IPost';

@Controller('/posts')
@ApiTags('Posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'Receive posts' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  getAllPosts(@RequestData('userDataFromToken') tokenData: IToken) {
    return this.postService.getAllPosts(tokenData);
  }

  @Post()
  @ApiOperation({ summary: 'Create post' })
  @ApiConsumes('multipart/form-data')
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiResponse({ status: 201, description: 'Post created' })
  @ApiResponse({ status: 400, description: 'Invalid/missing fields' })
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

  @Post('/like/:id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'Like a post' })
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiResponse({ status: 201, description: 'Post liked' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  likePost(
    @RequestData('post') post: IPost,
    @RequestData('userDataFromToken') tokenData: IToken,
  ) {
    return this.postService.likePost(tokenData, post);
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'Delete post by id' })
  @ApiResponse({ status: 200, description: 'Post deleted' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  deleteUser(@RequestData('post') post: IPost) {
    return this.postService.deletePost(post);
  }
}
