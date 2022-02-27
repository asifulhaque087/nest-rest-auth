import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Get()
  async index() {
    return await this.service.findAll();
  }
}
