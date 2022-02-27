import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';


export type RoleDocument= Role & Document;


@Schema()
export class Role{
  @Prop({ required: true })
  name: string;


  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  permissions: Role[];


  @Prop({ required: true })
  createdAt: Date;


  @Prop()
  deletedAt?: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);




