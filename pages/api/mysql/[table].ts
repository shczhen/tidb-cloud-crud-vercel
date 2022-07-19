import { connection } from "./index";
import type { NextApiRequest, NextApiResponse } from "next";

// Main handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { table: tableName } = req.query;

  try {
    const results = await connection.query(`describe ${tableName}`);
    res.status(200).json({ data: results });
  } catch (error) {
    res.status(500).send(error);
  } finally {
    // Run clean up function
    await connection.end();
  }
}
