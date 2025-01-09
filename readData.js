import { InfluxDBClient, Point } from "@influxdata/influxdb3-client";

async function fetchWasteData() {
  const client = new InfluxDBClient({
    host: "https://us-east-1-1.aws.cloud2.influxdata.com",
    token: "8KRxJ86Au_Jxxanx-Cd6rJd5eXuv5UP2p_vtRa_uHAJMHTwzRTJHaWaEXAy-OoM4f_6XcGZmbNU9eis7gTlq6A==",
  });

  const query = `SELECT *
    FROM "Dashboard"
    WHERE
    time >= now() - interval '7 days'
    AND
    ("Fill Level" IS NOT NULL OR "Waste Type" IS NOT NULL)
    ORDER BY time asc`;

  try {
    const rows = await client.query(query, 'TrialBucket');
    const data = [];

    for await (const row of rows) {
      data.push({
        binId: row["Bin ID"] || '',
        wasteType: row["Waste Type"] || '',
        fillLevel: row["Fill Level"] ? `${row["Fill Level"].toFixed(2)}%` : "0%",
        time: new Date(row.time)
      });
    }
    return data;
  } catch (err) {
    console.error("Error querying InfluxDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

export { fetchWasteData };