import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-clients/jobber-auth';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'bcryptjs';
import { DeleteUserInput } from './dto/delete-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { BaseConfig } from '../config/base-config';
import { ConfigService, ConfigType } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    /*@Inject(BaseConfig.KEY)
    private readonly baseConfig: ConfigType<typeof BaseConfig>*/
    private readonly configService: ConfigService
  ) {}

  async createUser(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data: {
        ...data,
        password: await hash(data.password, 10),
      },
    });
  }

  async getUsers() {
    console.log(this.configService.getOrThrow('APP_NAME'));
    return this.prismaService.user.findMany();
  }

  async deleteUser(data: DeleteUserInput) {
    return await this.prismaService.user.delete({
      where: { id: data.id },
    });
  }

  async updateUser(updateUserInput: UpdateUserInput) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { id: updateUserInput.id },
    });

    return await this.prismaService.user.update({
      where: { id: updateUserInput.id },
      data: {
        ...updateUserInput,
        password: updateUserInput.password
          ? await hash(updateUserInput.password, 10)
          : existingUser.password,
      },
    });
  }
}
