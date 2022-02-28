import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/entities/user.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission, PermissionDocument } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(@InjectModel(Permission.name) private readonly PermissionModel: Model<PermissionDocument>) {}
  // constructor(@InjectModel(Permission.name) private readonly PermissionModel: Model<PermissionDocument>,@InjectModel(User.name) private readonly UserModel: Model<UserDocument>) {}

  async create(createPermissionDto: CreatePermissionDto) {

    let newPermission = new this.PermissionModel(createPermissionDto)
    newPermission = await newPermission.save()
    return newPermission

  }

  findAll() {
    return this.PermissionModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
