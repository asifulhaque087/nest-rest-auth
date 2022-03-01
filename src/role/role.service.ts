import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleDocument } from './entities/role.entity';
import * as mongoose from 'mongoose';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private readonly RoleModel: Model<RoleDocument>) {}

  async create(createRoleDto: CreateRoleDto) {
    let newRole= new this.RoleModel(createRoleDto)
    newRole = await newRole.save()
    return newRole
  }

  findAll() {
    // return this.RoleModel.find();

    return this.RoleModel.aggregate([
    {
        $lookup: {
          from: "permissions",
          localField: "permissions",
          foreignField: "_id",
          as: "permissions",
        },
      }])
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async update(id: any, updateRoleDto: UpdateRoleDto) {
    const role = await this.RoleModel.findById(id)
    const p_id = new mongoose.Types.ObjectId(updateRoleDto.permission)
    role.permissions.push(p_id)
    
    const newRole = await role.save()
    return newRole

    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
