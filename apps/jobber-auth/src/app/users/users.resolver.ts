import { Mutation, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { Query } from '@nestjs/graphql';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {
  }

  @Mutation(() => User)
  async createUser() {}

  @Query(() => [User],{ name: 'users'} )
  async getUsers() {}
}
