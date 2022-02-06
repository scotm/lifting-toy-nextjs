import { NextApiRequest } from "next";

export default function parseID(req: NextApiRequest): number {
  const { id } = req.query;
  return Number.parseInt(Array.isArray(id) ? id[0] : id);
}
