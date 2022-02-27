import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from './entities/user.entity';
import * as bcrypt from "bcryptjs"

@Module({
  // imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre<UserDocument>('save', async function(next) { 
            if (!this.isModified("password")){
              next();
            }
            this.password = await bcrypt.hash(this.password, 12)
            next();
          });
          return schema;
        },
      },
    ]),
  ],

  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
