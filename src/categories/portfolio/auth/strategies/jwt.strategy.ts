import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PortfolioAuth } from 'src/common/entities/auth.model';
import { PortfolioAuthService } from '../auth.service';

export interface JwtPayload {
  sid: string
  iat: number
  exp: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: PortfolioAuthService,
    configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    // console.log({payload})
    const { sid } = payload
    const user = await this.authService.validateUser(sid)
    // return { userId: payload.sub, username: payload.username };
    return user
  }
}