// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { Licence } from "../../../entities/Licence";
import getEM from "../../../util/getEM";
import withORM from "../../../util/withORM";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const em = getEM();
  return res
    .status(200)
    .json(await em.find(Licence, {}, { orderBy: { ["fullName"]: "ASC" } }));
}

export default withORM(handler);
