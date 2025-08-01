import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { BaseConfig } from './config/base-config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      context: ({ req, res }) => ({ req, res }),
      autoSchemaFile: true,
    }),
    UsersModule,
    ConfigModule.forRoot({
      load: [BaseConfig],
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
