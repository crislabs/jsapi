import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUser, SignIn } from "src/common/dto/user.input";
import { PortfolioAuth } from "src/common/entities/auth.model";
import { PortfolioUserService } from "../users/users.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { PortfolioUser } from "src/common/entities/user.model";
@Injectable()
export class PortfolioAuthService {
  constructor(
    private readonly userService: PortfolioUserService,
    private jwtService: JwtService
  ) {}
  async signUp(input: CreateUser): Promise<PortfolioAuth> {
    const user = await this.userService.create(input) 
    const token = this.jwtService.sign({sid: user._id})

    return {token, user};
  }
  async signIn(input: SignIn): Promise<PortfolioAuth> {
    const user = await this.userService.findOneByEmail(input.email, input.siteId) 
    if ( !bcrypt.compareSync(input.password, user.data.password)) {
      throw new BadRequestException('Email/Password invalid');
    }
    const token = this.jwtService.sign({sid: user._id})
    return {token, user};
  }
  async validateUser(sid: string) {
    const user = await this.userService.findOne(sid)
    delete user.data.password
    // user.data.password = ''
    return user
  }

  revalidateToken(user: PortfolioUser): PortfolioAuth {
    const token = this.jwtService.sign({sid: user._id})
    return {
      token, user
    }
  }
}