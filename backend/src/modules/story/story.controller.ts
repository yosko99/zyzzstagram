import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Inject,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { RequestData } from '../../decorators/requestData.decorator';

import IToken from '../../interfaces/IToken';
import IStory from '../../interfaces/IStory';

import { multerFilter } from '../../config/multer';

import StoriesType from '../../types/stories.type';
import { CreateStoryDto } from '../../dto/story.dto';

import { StoryService } from './story.service';

@Controller('/stories')
@ApiTags('Stories')
export class StoryController {
  constructor(
    @Inject(StoryService) private readonly storyService: StoryService,
  ) {}

  @Get('/')
  @ApiOperation({ summary: 'Get stories' })
  @ApiQuery({
    name: 'stories_type',
    allowEmptyValue: true,
    enum: ['following'],
    required: false,
    description: 'Optional query which decides what kind of stories to get',
  })
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiResponse({
    status: 200,
    description: 'Receive stories',
  })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  getPosts(
    @RequestData('userDataFromToken') tokenData: IToken,
    @Query('stories_type') storiesType: StoriesType,
  ) {
    return this.storyService.getStories(tokenData, storiesType);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ summary: 'Create a story' })
  @ApiResponse({ status: 201, description: 'Story created' })
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
    _createStoryDto: CreateStoryDto,
    @RequestData('userDataFromToken')
    tokenData: IToken,
  ) {
    return this.storyService.createStory(file.filename, tokenData);
  }

  @Post('/:id/likes')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'Like a story or remove like' })
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiResponse({ status: 201, description: 'Story liked/unliked' })
  @ApiResponse({ status: 404, description: 'Story not found' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  likePost(
    @RequestData('story') story: IStory,
    @RequestData('userDataFromToken') tokenData: IToken,
  ) {
    return this.storyService.likeStory(story, tokenData);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete story by id' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Story deleted' })
  @ApiResponse({ status: 404, description: 'Story not found' })
  deleteStory(@RequestData('story') story: IStory) {
    return this.storyService.deleteStory(story);
  }
}
