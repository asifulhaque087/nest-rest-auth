import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly UserModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {

    const user = await this.UserModel.findOne({email:createUserDto.email})

    if (user){
      throw new BadRequestException("User already exists")
    }

    let newUser = new this.UserModel(createUserDto)
    newUser = await newUser.save()

    const token = newUser.getSignedJwtToken()

    return token;


  }

  async login(loginUserDto: LoginUserDto){

    const user = await this.UserModel.findOne({email:loginUserDto.email})

    if (!user){
      throw new NotFoundException("User not found")
    }

    const match = await user.matchPassword(loginUserDto.password)

    if (!match){
      throw new BadRequestException("Wrong Credentials")
    }

    const token = user.getSignedJwtToken()
    return token;

  }

  findAll() {
    // return this.UserModel.find();

    return this.UserModel.aggregate([
    {
        $lookup: {
          from: "roles",
          localField: "roles",
          foreignField: "_id",
          as: "roles",
        },
      },
      {
        $unwind: {
          path: "$roles",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "permissions",
          localField: "roles._id",
          foreignField: "_id",
          as: "roles.permissions",
        }
      },
      {
        $group: {
          _id : "$_id",
          name: { $first: "$name" },
          email: { $first: "$email" },
          roles: { $push: "$roles" }
        }
      }
    ])
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findAuthUser(id: any) {
    console.log("from user service ", id._id)

    // const user = this.UserModel.find(id)
    // return user

    id = new mongoose.Types.ObjectId(id._id)

    console.log("the final id is ", id)

    return this.UserModel.aggregate([
    { 
        $match:{"_id":{$eq:id}}
    },
    {
        $lookup: {
          from: "roles",
          localField: "roles",
          foreignField: "_id",
          as: "roles",
        },
      },
      {
        $unwind: {
          path: "$roles",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "permissions",
          localField: "roles._id",
          foreignField: "_id",
          as: "roles.permissions",
        }
      },
      {
        $group: {
          _id : "$_id",
          name: { $first: "$name" },
          email: { $first: "$email" },
          roles: { $push: "$roles" }
        }
      }
    ])
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
