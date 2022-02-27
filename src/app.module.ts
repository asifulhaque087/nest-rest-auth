import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest-rest-auth'), UserModule, RoleModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}

