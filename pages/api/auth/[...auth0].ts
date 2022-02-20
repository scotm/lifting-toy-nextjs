// pages/api/auth/[...auth0].js
import {
  CallbackOptions,
  handleAuth,
  handleCallback,
  Session,
} from "@auth0/nextjs-auth0";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../db";

const options: CallbackOptions = {
  afterCallback: async (
    req: NextApiRequest,
    res: NextApiResponse,
    session: Session,
    state: { [key: string]: any }
  ) => {
    // console.log({ req, res, session, state });
    const where: Prisma.UserWhereUniqueInput = {
      external_id: session.user.sub,
    };

    const user = await prisma.user.findUnique({
      where: where,
    });

    if (!user) {
      await prisma.user.create({
        data: {
          external_id: session.user.sub,
          email: session.user.email,
          firstname: session.user.given_name,
          lastname: session.user.family_name,
          joining_date: new Date(),
        },
      });
    }
    return session;
  },
};

export default handleAuth({
  async callback(req, res) {
    await handleCallback(req, res, options);
  },
});
