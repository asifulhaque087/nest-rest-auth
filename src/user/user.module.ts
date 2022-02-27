import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';

@Module({
  // imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', function() { console.log('Hello from pre save') });
          return schema;
        },
      },
    ]),
  ],

  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
