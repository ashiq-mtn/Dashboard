import { InfluxDBClient, Point } from "@influxdata/influxdb3-client";

async function main() {
    const client = new InfluxDBClient({
      host: "https://us-east-1-1.aws.cloud2.influxdata.com",
      token:"8KRxJ86Au_Jxxanx-Cd6rJd5eXuv5UP2p_vtRa_uHAJMHTwzRTJHaWaEXAy-OoM4f_6XcGZmbNU9eis7gTlq6A=="
    });
    let database = `TrialBucket`;

    const points = [
        Point.measurement("CASH")
        .setTag("Bin ID", "001")
        .setStringField("Waste Type", "Paper"),
        Point.measurement("CASH")
        .setTag("Bin ID", "002")
        .setStringField("Waste Type", "Plastic"),
        Point.measurement("CASH")
        .setTag("Bin ID", "003")
        .setStringField("Waste Type", "Paper"),
        Point.measurement("CASH")
        .setTag("Bin ID", "004")
        .setStringField("Waste Type", "Other")
    ];

    try {
        for (let i = 0; i < points.length; i++) {
        const point = points[i];
        await client.write(point, database)
            // separate points by 1 second
            .then(() => new Promise(resolve => setTimeout(resolve, 1000)));
        }
        console.log("Data written successfully!");
    } catch (err) {
        console.error("Error writing data to InfluxDB:", err);
    } finally {
      client.close();
    }

}

main().catch(console.error);