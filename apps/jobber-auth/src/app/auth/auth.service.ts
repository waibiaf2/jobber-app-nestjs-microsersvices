import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './dto/login-input';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async login({ email, password }: LoginInput, response: Response) {
    const user = await this.verifyUser(email, password);

    const expires = new Date();
    expires.setMilliseconds(
      expires.getMilliseconds() +
        parseInt(this.configService.getOrThrow('JWT_EXPIRES_IN'))
    );

    const tokenPayload: TokenPayload = {
      userId: user.id,
    };

    const accessToken = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: this.configService.getOrThrow('NODE_ENV') === 'production',
      expires,
      sameSite: 'strict',
    });

    return user;
  }

  private async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUser({ email });

      console.log(user);

      const authenticated = await compare(password, user.password);

      if (!authenticated) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (e) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
