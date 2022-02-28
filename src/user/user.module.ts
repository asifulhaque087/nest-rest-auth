import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from './entities/user.entity';
import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"

@Module({
  // imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          // pre middleware
          schema.pre<UserDocument>('save', async function(next) { 
            if (!this.isModified("password")){
              next();
            }
            this.password = await bcrypt.hash(this.password, 12)
            next();
          });

          // methods
          // schema.methods.getSignedJwtToken = function () {
          //   return jwt.sign(this._id, "MRIDUL" ,{expiresIn:"5m"})
          // };

          // schema.methods.matchPassword = async function (password:string) {
          //   return bcrypt.compare(password, this.password)
          // };

          return schema;
        },
      },
    ]),
  ],

  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
