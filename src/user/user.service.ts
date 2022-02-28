import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

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
    return this.UserModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
