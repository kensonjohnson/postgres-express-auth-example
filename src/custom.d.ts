declare namespace Express {
  export interface User {
    id: number;
    email: string;
  }
}

declare module "passport-magic-link" {
  import { Strategy } from "passport";
  import { User } from "express";

  export type SendEmailToUser = (user: User, token: string) => Promise<any>;
  export type VerifyUser = (user: User) => Promise<User>;

  export interface MagicLinkStrategyOptions {
    secret: string;
    userFields: string[];
    tokenField: string;
    verifyUserAfterToken: boolean;
  }

  export class Strategy extends Strategy {
    constructor(
      options: MagicLinkStrategyOptions,
      sendEmailToUser: SendEmailToUser,
      verifyUser: VerifyUser
    );
  }
}

declare namespace passport {
  export interface MagicLink {
    Strategy: typeof Strategy;
  }
}
