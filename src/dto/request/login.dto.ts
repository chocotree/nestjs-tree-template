import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  pwd: string;
}
