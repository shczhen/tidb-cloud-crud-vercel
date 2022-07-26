import serverlessMysql from "serverless-mysql";
import type { NextApiRequest, NextApiResponse } from "next";

export const connection = serverlessMysql({
  config: {
    host: process.env.TIDB_URI,
    database: process.env.TIDB_DB || "test",
    user: process.env.TIDB_USER || "root",
    password: process.env.TIDB_PASSWD,
    port: parseInt(process.env.TIDB_DB || "4000"),
  },
});

// Main handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const results = await connection.query("show tables;");
    res.status(200).json({ data: results });
  } catch (error) {
    res.status(500).send(error);
  } finally {
    // Run clean up function
    await connection.end();
  }
}
