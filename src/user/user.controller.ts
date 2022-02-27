import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RegisterDto } from './dto/register-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async index() {
    return await this.service.findAll();
  }

//   @Get(':id')
//   async find(@Param('id') id: string) {
//     return await this.service.findOne(id);
//   }

  // @Post('register')
  // async create(@Body() createTodoDto: RegisterDto) {
  //   return await this.service.register(createTodoDto);
  // }

//   @Put(':id')
//   async update(@Param('id') id: string, @Body() updateTodoDto: UpdateUserDto) {
//     return await this.service.update(id, updateTodoDto);
//   }

//   @Delete(':id')
//   async delete(@Param('id') id: string) {
//     return await this.service.delete(id);
//   }

}
