import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './schemas/role.schema';

@Injectable()
export class RoleService {
    constructor(@InjectModel(Role.name) private RoleModel: Model<RoleDocument>) {}

    async findAll(): Promise<Role[]> {
        console.log("model name is ", Role.name)
        return await this.RoleModel.find().exec();
    }

}
