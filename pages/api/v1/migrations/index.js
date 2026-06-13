import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response.status(405).json({ error: "Method not allowed" });
  }

  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const defaultMigrationsOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: join(process.cwd(), "infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "migrations",
    };

    if (request.method === "GET") {
      const migrations = await migrationRunner(defaultMigrationsOptions);

      return response.status(200).json(migrations);
    }

    if (request.method === "POST") {
      const migrations = await migrationRunner({
        ...defaultMigrationsOptions,
        dryRun: false,
      });

      if (migrations.length === 0) {
        return response.status(200).json({ message: "No migrations to run" });
      }

      return response.status(201).json(migrations);
    }
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  } finally {
    await dbClient.end();
  }
}
