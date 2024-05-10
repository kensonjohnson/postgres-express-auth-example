declare namespace Express {
  export interface User {
    id: number;
    email: string;
  }
}

declare module "passport-magic-link" {
  import type { SentMessageInfo } from "nodemailer";
  import { Strategy } from "passport";
  import { User } from "express";

  export type SendEmailToUser = (
    user: User,
    token: string
  ) => Promise<SentMessageInfo>;
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
