import { InfluxDBClient, Point } from "@influxdata/influxdb3-client";

async function main() {
  const client = new InfluxDBClient({
    host: "https://us-east-1-1.aws.cloud2.influxdata.com",
    token:
      "8KRxJ86Au_Jxxanx-Cd6rJd5eXuv5UP2p_vtRa_uHAJMHTwzRTJHaWaEXAy-OoM4f_6XcGZmbNU9eis7gTlq6A==",
  });
  let database = `TrialBucket`;

  const query = `SELECT *
    FROM "new waste"
    WHERE time >= now() - interval '3 hours'
    AND ("Waste Type" IS NOT NULL)
    AND "Bin ID" IN ('001','002','003','004','005','006') 
    ORDER BY time asc`;

  try {
    const rows = await client.query(query, "TrialBucket");
    // Print the header row
    console.log(`${"Bin ID".padEnd(10)}${"Waste Type".padEnd(15)}${"Time".padEnd(20)}`);

    // Loop through the rows and print the data
    for await (const row of rows) {
      let binID = row["Bin ID"] || "";
      let wasteType = row["Waste Type"] || "";
      let time = new Date(row.time);
      console.log(`${binID.padEnd(10)}${wasteType.padEnd(15)}${time.toString().padEnd(20)}`);
    }
  } catch (err) {
    console.error("Error querying InfluxDB:", err);
  } finally {
    client.close();
  }
}

main().catch(console.error);
