import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsOptional,
  IsPositive,
  IsStrongPassword,
} from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsPositive()
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsStrongPassword()
  password?: string;
}
