import { runner } from 'node-pg-migrate';
import { join } from 'node:path';
import database from 'infra/database.js';

export default async function migrations(request, response) {

  const dbClient = await database.getNewClient();

  const defaultMigrationsOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: join('infra', 'migrations'),
      direction: 'up',
      verbose: true,
      migrationsTable: 'migrations',
    };
  
  if(request.method === 'GET') {
    const migrations = await runner(defaultMigrationsOptions);
    await dbClient.end();
    return response.status(200).json(migrations);
  }
  
  if(request.method === 'POST') {
    const migrations = await runner({
      ...defaultMigrationsOptions,
      dryRun: false
    });
    await dbClient.end();

    if(migrations.length === 0) {
      return response.status(200).json({ message: 'No migrations to run' });
    }
    
    return response.status(201).json(migrations);  
  }

  response.status(405).json({ error: 'Method not allowed' });
}