import database from "infra/database";
import waitForAllServices from "tests/orchestrator.js";

beforeAll(async () => {
  await waitForAllServices();
  await database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
});

test("GET to /api/v1/migrations should return 200", async () => {

  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.length).toBeGreaterThan(0);  
});