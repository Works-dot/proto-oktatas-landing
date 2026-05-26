import path from "node:path";
import { fileURLToPath } from "node:url";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import app from "./app";
import { logger } from "./lib/logger";
import { db } from "@workspace/db";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

async function main() {
  const migrationsFolder =
    process.env["MIGRATIONS_DIR"] ??
    path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "./drizzle",
    );

  logger.info({ migrationsFolder }, "Running database migrations");
  try {
    await migrate(db, { migrationsFolder });
    logger.info("Migrations applied");
  } catch (err) {
    logger.error({ err }, "Migration failed");
    process.exit(1);
  }

  app.listen(port, "0.0.0.0", (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }
    logger.info({ port, host: "0.0.0.0" }, "Server listening");
  });
}

main();
