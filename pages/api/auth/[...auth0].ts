// pages/api/auth/[...auth0].js
import {
  handleAuth,
  handleCallback,
  Session
} from "@auth0/nextjs-auth0";
import { MikroORM } from "@mikro-orm/core";
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../entities/User";
import config from "../../../mikro-orm.config";

const getORM = async () => {
  if (!global.__MikroORM__) {
    let orm = MikroORM.init(config);
    global.__MikroORM__ = await orm;
  }
  return global.__MikroORM__;
};

async function callback(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session,
  state: { [key: string]: any }
){
  const orm = getORM();
  const em = (await orm).em;
  // Let's try and find a matching user - if we fail, create a new user
  try {
    await em.findOneOrFail(User, { externalId: session.user.sub });
  } catch {
    em.persistAndFlush(
      em.create(User, {
        externalId: session.user.sub,
        email: session.user.email,
        firstname: session.user.given_name,
        lastname: session.user.family_name,
        joiningDate: new Date(),
      })
    );
  }
  return session;
}

export default handleAuth({
  async callback(req, res) {
    await handleCallback(req, res, {
      afterCallback: callback
    });
  },
});
