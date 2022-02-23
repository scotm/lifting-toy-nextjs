import { MikroORM, RequestContext } from "@mikro-orm/core";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import config from "../mikro-orm.config";
import { areWeTestingWithJest } from "./testing";

declare global {
  var __MikroORM__: MikroORM;
}

const getORM = async () => {
  if (!global.__MikroORM__) {
    let orm = MikroORM.init(config);
    // if (config.type === "sqlite" && config.dbName === ":memory:") {
    //   orm.then(async (orm) => {
    //     // specific to in-memory sqlite
    //     const generator = orm.getSchemaGenerator();
    //     await generator.createSchema().catch();
    //     return orm;
    //   });
    // }
    global.__MikroORM__ = await orm;
  }
  return global.__MikroORM__;
};

const withORM =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const orm = await getORM();
    return RequestContext.createAsync(orm.em, async () => handler(req, res));
  };

export default withORM;
