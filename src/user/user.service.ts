import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly UserModel: Model<UserDocument>) {}

    async findAll(): Promise<User[]> {
        console.log("model name is ", User.name)
        return await this.UserModel.find().exec();
    }


    // async register(createTodoDto): Promise<User> {
    //     return await new this.model({
    //         ...createTodoDto,
    //         createdAt: new Date(),
    //     }).save();
    // }


}
