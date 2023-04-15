import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  ParseFilePipe,
  Post,
  Query,
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
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { multerFilter } from '../../config/multer';

import { RequestData } from '../../decorators/requestData.decorator';

import { PostService } from './post.service';

import { CreateCommentDto } from '../../dto/comment.dto';
import { CreatePostDto } from '../../dto/post.dto';

import IComment from '../../interfaces/IComment';
import IToken from '../../interfaces/IToken';
import IPost from '../../interfaces/IPost';

import PostsType from '../../types/posts.type';

@Controller('/posts')
@ApiTags('Posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all posts' })
  @ApiQuery({
    name: 'postsType',
    allowEmptyValue: true,
    enum: ['following', 'explore'],
    required: false,
    description: 'Optional query which decides what kind of posts to',
  })
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiResponse({ status: 200, description: 'Receive posts' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  getPosts(
    @RequestData('userDataFromToken') tokenData: IToken,
    @Query('postsType') postsType: PostsType,
  ) {
    return this.postService.getPosts(tokenData, postsType);
  }

  @Get('/:id')
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ summary: 'Get post by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Receive post' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  getPostById(@RequestData('post') post: IPost) {
    return this.postService.getPostById(post);
  }

  @Post('/:id/saved-by')
  @ApiParam({ name: 'id', type: 'string', description: 'Post ID' })
  @ApiOperation({ summary: 'Save/unsave a post' })
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiResponse({ status: 201, description: 'Post saved/unsaved' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  savePost(
    @RequestData('post') post: IPost,
    @RequestData('userDataFromToken') tokenData: IToken,
  ) {
    return this.postService.savePost(post, tokenData);
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

  @Post('/:id/likes')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'Like a post or remove like' })
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiResponse({ status: 201, description: 'Post liked/unliked' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  likePost(
    @RequestData('post') post: IPost,
    @RequestData('userDataFromToken') tokenData: IToken,
  ) {
    return this.postService.likePost(post, tokenData);
  }

  @Post('/:id/comments')
  @UsePipes(ValidationPipe)
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'Creates a comment' })
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiResponse({ status: 201, description: 'Comment created' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @ApiResponse({ status: 400, description: 'Invalid or missing fields' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  commentPost(
    @RequestData('post') post: IPost,
    @RequestData('userDataFromToken') tokenData: IToken,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.postService.commentPost(
      post,
      createCommentDto.content,
      tokenData,
    );
  }

  @Post('/:id/comments/:commentId/likes')
  @ApiParam({ name: 'id', type: 'string', description: 'Post ID' })
  @ApiParam({ name: 'commentId', type: 'string', description: 'Comment ID' })
  @ApiOperation({ summary: 'Likes a post comment' })
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiResponse({ status: 201, description: 'Comment liked/unliked' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  likeComment(
    @RequestData('comment') comment: IComment,
    @RequestData('userDataFromToken') tokenData: IToken,
  ) {
    return this.postService.likeComment(comment, tokenData);
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
