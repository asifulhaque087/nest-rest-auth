import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UnauthorizedException } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import * as jwt from "jsonwebtoken"
import { UserService } from 'src/user/user.service';

@Controller('permission')
export class PermissionController {
  // constructor(private readonly permissionService: PermissionService) {}
  constructor(private readonly permissionService: PermissionService, private readonly userService: UserService) {}

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  async findAll(@Req() req) {

    const obj = {
      GET: "view",
      POST: "create",
      PATCH: "edit"
    }

    const path = req.path.replaceAll("/","-")
    const permission = `${obj[req.method]}${path}`


    const authHeader = req.headers.authorization
    if (authHeader){
      const token = authHeader.split("Bearer ")[1]
      if (token){
        const user_id = jwt.verify(token, "MRIDUL")


        const user = await this.userService.findAuthUser(user_id)

        if (user){
          let val : boolean
          user[0].roles.map(r => r.permissions.find(p=> {
            if (p.name === permission){
              val = true
            }
            return p.name === permission
          }))

          if (!val){
            throw new UnauthorizedException("permission denied")
          }
          console.log("val is ", val)

        }

      }
    }
    // next login for authenticate jwt token 
    return this.permissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionService.remove(+id);
  }
}
