
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { ObjectId } from "mongoose";
export type UserDocument = User & Document;
@Schema()
export class User{
    @Transform(({value})=>value.toString())
    _id:ObjectId;
    @Prop({required:true})
    username:string;
    @Prop({required:true})
    password:string;
    @Prop({required:true})
    email:string;
}
export const UserSchema = SchemaFactory.createForClass(User);