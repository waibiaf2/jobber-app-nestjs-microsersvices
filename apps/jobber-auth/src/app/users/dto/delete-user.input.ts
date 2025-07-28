import { Field, InputType } from '@nestjs/graphql';
import { IsPositive } from 'class-validator';

@InputType()
export class DeleteUserInput {
  @Field()
  @IsPositive()
  id: number;
}
