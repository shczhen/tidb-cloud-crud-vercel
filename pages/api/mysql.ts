import serverlessMysql from "serverless-mysql";
import type { NextApiRequest, NextApiResponse } from "next";

const connection = serverlessMysql({
  config: {
    host: process.env.TIDB_URI,
    database: (process.env.TIDB_DB as string) || "test",
    user: (process.env.TIDB_USER as string) || "root",
    password: process.env.TIDB_PASSWD,
    port: parseInt(process.env.TIDB_DB || "4000"),
  },
});

// Main handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // Run your query
  let results = await connection.query("describe expresses;");

  // Run clean up function
  await connection.end();

  // Return the results
  // return results;
  res.status(200).json({ data: results });
}
