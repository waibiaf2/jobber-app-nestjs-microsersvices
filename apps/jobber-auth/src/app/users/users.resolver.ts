import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { Query } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { DeleteUserInput } from './dto/delete-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.usersService.createUser(createUserInput);
  }

  @Mutation(() => User)
  async deleteUser(@Args('deleteUserInput') deleteUserInput: DeleteUserInput) {
    return await this.usersService.deleteUser(deleteUserInput);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.usersService.updateUser(updateUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async getUsers() {
    return this.usersService.getUsers();
  }
}
