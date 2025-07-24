import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from '@jobber-app/nestjs';

@ObjectType()
export class User extends AbstractModel {
  @Field()
  email: string;
}
