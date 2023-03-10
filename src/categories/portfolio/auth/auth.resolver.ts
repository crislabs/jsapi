import { UseGuards, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUser, SignIn } from 'src/common/dto/user.input';
import { PortfolioAuth } from 'src/common/entities/auth.model';
import { PortfolioUser } from 'src/common/entities/user.model';
import { PortfolioUserService } from '../users/users.service';
import { PortfolioAuthService } from './auth.service';
import { CurrentUser } from './decorators/user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Resolver()
export class PortfolioAuthResolver {
  constructor(
    private readonly authService: PortfolioAuthService,
    private readonly userService: PortfolioUserService,
  ) {}
  @Mutation(() => PortfolioAuth, { name: 'portfolioSignUp' })
  async signUp(@Args('input') input: CreateUser): Promise<PortfolioAuth> {
    
    return this.authService.signUp(input)
  }
  @Mutation(() => PortfolioAuth, { name: 'portfolioSignIn' })
  async signIn(@Args('input') input: SignIn): Promise<PortfolioAuth> {
    // const user = await this.authService.signIn(input) 
    return this.authService.signIn(input)
  }
  @Query(() => PortfolioAuth, {name: 'portfolioRevalidate' })
  @UseGuards(JwtAuthGuard)
  revalidateToken(@CurrentUser() user: PortfolioUser ){
    return this.authService.revalidateToken(user)
  }
}
