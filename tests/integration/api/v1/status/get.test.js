test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const respBody = await response.json();

  const parsedUpdatedAt = new Date(respBody.updated_at).toISOString();
  expect(respBody.updated_at).toBe(parsedUpdatedAt);

  expect(respBody.dependencies.database.version).toEqual("16.13");
  expect(respBody.dependencies.database.max_connections).toEqual(100);
  expect(respBody.dependencies.database.opened_connections).toEqual(1);
  
});