import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Permission } from 'src/permission/entities/permission.entity';


export type RoleDocument= Role & Document;


@Schema()
export class Role{
  @Prop({ required: true })
  name: string;


  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }] })
  permissions: Permission[];


  @Prop({ required: true , default: new Date()})
  createdAt: Date;


  @Prop()
  deletedAt?: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);




