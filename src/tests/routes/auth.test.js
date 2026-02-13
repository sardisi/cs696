const request = require("supertest");
const app = require("../../../server.js");

describe("POST /api/auth/signup", () => {
  it("should create a new user", async () => {
await new Promise(resolve => setTimeout(resolve, 2000));
    
    const timestamp = Date.now(); // issues with user already created, so made them unique
    
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Test User",
        username: `testuser${timestamp}`,
        email: `testemail${timestamp}@test.com`,
        password: "password123"
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test User");
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("username");
    expect(res.body).toHaveProperty("email");
    expect(res.body).not.toHaveProperty("password");
  });
});
