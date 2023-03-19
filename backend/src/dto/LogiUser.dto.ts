import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  @ApiProperty({ minLength: 8 })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  username: string;
}
