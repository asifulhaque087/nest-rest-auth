import {  IsString , IsEmail, IsOptional} from "class-validator";
export class CreateUserDto {
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    phone: string

    @IsOptional()
    @IsString()
    role: string

    @IsString()
    password: string
}
