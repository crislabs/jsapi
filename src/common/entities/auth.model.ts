import { Field, ObjectType } from "@nestjs/graphql";
import { PortfolioUser } from "./user.model";
import { UserDocument } from "./user.schema";

@ObjectType()
export class PortfolioAuth {
  @Field(() => String)
  token: string;
  
  @Field(() => PortfolioUser)
  user: PortfolioUser;

}

