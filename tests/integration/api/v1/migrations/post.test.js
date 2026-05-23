import database from "infra/database";

beforeAll(clearDatabase);

async function clearDatabase() {
  await database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
}

test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST"
  });
  expect(response.status).toBe(201);

  const responseBody = await response.json();  
  
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

  for(const migration of responseBody) {
    expect(migration).toHaveProperty("path");
    expect(migration).toHaveProperty("name");
    expect(migration).toHaveProperty("timestamp");
  }
});