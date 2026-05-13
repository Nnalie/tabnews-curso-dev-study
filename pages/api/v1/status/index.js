import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const db_version = await database.query("SHOW server_version;");
  const maxConn = await database.query("SHOW max_connections;");

  const databaseName = 'local_db';
  const openedConn = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datName=$1;",
    values: [databaseName]
  });

  response.status(200).send({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: db_version.rows[0].server_version,
        max_connections: parseInt(maxConn.rows[0].max_connections),
        opened_connections: openedConn.rows[0].count
      }
    }
  });
}

export default status;
