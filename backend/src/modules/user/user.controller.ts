import {
  Body,
  Controller,
  FileTypeValidator,
  Delete,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Get, HttpCode } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserDto, LoginUserDto } from '../../dto/user.dto';

import { UserService } from './user.service';

import { multerFilter } from '../../config/multer';

import { RequestData } from '../../decorators/requestData.decorator';

import IUser from '../../interfaces/IUser';
import IToken from '../../interfaces/IToken';

@Controller('/users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:username/user')
  @ApiParam({ name: 'username', type: 'string' })
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ summary: 'Get user data by username' })
  @ApiResponse({ status: 200, description: 'Receive user data' })
  @ApiResponse({ status: 404, description: 'Non existent username' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  getUserByUsername(
    @RequestData('user') user: IUser,
    @RequestData('userDataFromToken') tokenData: IToken,
  ) {
    return this.userService.getUserByUsername(user, tokenData);
  }

  @Get('/current')
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ summary: 'Get current user data by token' })
  @ApiResponse({ status: 200, description: 'Receive user data' })
  @ApiResponse({ status: 404, description: 'Non existent user' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  getCurrentUser(@RequestData('userDataFromToken') tokenData: IToken) {
    return this.userService.getCurrentUser(tokenData);
  }

  @Get('/current/saved-posts')
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ summary: 'Get current user saved posts' })
  @ApiResponse({ status: 200, description: 'Receive saved posts' })
  @ApiResponse({ status: 404, description: 'Non existent user' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  getCurrentUserSavedPosts(
    @RequestData('userDataFromToken') tokenData: IToken,
  ) {
    return this.userService.getCurrentUserSavedPosts(tokenData);
  }

  @Get('/:username/followers')
  @ApiParam({ name: 'username', type: 'string' })
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ summary: 'Get user followers' })
  @ApiResponse({ status: 200, description: 'Receive followers' })
  @ApiResponse({ status: 404, description: 'Non existent user' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  getUserFollowers(
    @RequestData('user') user: IUser,
    @RequestData('userDataFromToken') tokenData: IToken,
  ) {
    return this.userService.getUserFollowers(user, tokenData);
  }

  @Get('/:username/following')
  @ApiParam({ name: 'username', type: 'string' })
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ summary: 'Get user following' })
  @ApiResponse({ status: 200, description: 'Receive following users' })
  @ApiResponse({ status: 404, description: 'Non existent user' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  getUserFollowing(
    @RequestData('user') user: IUser,
    @RequestData('userDataFromToken') tokenData: IToken,
  ) {
    return this.userService.getUserFollowing(user, tokenData);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 400, description: 'Invalid/missing fields' })
  @ApiResponse({ status: 409, description: 'Name or email is already taken' })
  @ApiResponse({ status: 400, description: 'Invalid or missing fields' })
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
    createUserDto: CreateUserDto,
  ) {
    return this.userService.createUser(createUserDto, file.filename);
  }

  @Post('/:username/followers')
  @ApiParam({ name: 'username', type: 'string' })
  @ApiOperation({ summary: 'Follow/unfollow user' })
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiResponse({ status: 201, description: 'User followed/unfollowed' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  likePost(
    @RequestData('user') user: IUser,
    @RequestData('userDataFromToken') tokenData: IToken,
  ) {
    return this.userService.followUser(user, tokenData);
  }

  @Post('/login')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'Logged in successfully' })
  @ApiResponse({ status: 400, description: 'Invalid/missing fields' })
  @ApiResponse({ status: 404, description: 'Non existent username' })
  @ApiResponse({ status: 401, description: 'Password mismatch' })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'User deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  deleteUser(@RequestData('user') user: IUser) {
    return this.userService.deleteUser(user);
  }
}
