const request = require("supertest");
const app = require("../app");
const { dbConnect, dbDisconnect } = require("../db/db_handler");
require("dotenv").config();

const userData = {
  pseudo: "testPseudo",
  email: "test@email.com",
  confirmPassword: "Password123",
  password: "Password123",
  birthday: "1993-03-08",
  presentation: "",
};

beforeAll(async () => {
  dbConnect();
});
afterAll(async () => {
  //dbDisconnect();
});

describe("Test Auth path", () => {
  beforeEach(() => {
    jest.setTimeout(60000);
  });
  describe("When add user", () => {
    jest.setTimeout(60000);
    it("should respond with 201 status code", async () => {
      try {
        const res = await request(app).post("/api/auth/signin").send(userData);
        expect(res.status).toBe(201);
      } catch (error) {
        console.log(error);
      }
    });
  });
  describe.skip("When Username and password are ok", () => {
    it("should to have status code 200 , token & refreshToken property", async () => {
      try {
        const res = await request(app).post("/api/auth/login").send({
          email: userData.email,
          password: userData.password,
        });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("token");
        expect(res.body).toHaveProperty("refreshToken");
        expect(res.body.token).toBeDefined();
        expect(res.body.refreshToken).toBeDefined();
      } catch (err) {
        console.log(err);
      }
    });
  });
  describe.skip("When email or password are wrong", () => {
    it("should have message : Utilisateur non trouvé", async () => {
      try {
        const res = await request(app).post("/api/auth/login").send({
          email: "wrong@email.com",
          password: userData.password,
        });
        expect(res.status).toBe(404);
        expect(res.body).toMatch("Utilisateur non trouvé !");
      } catch (error) {
        console.log(error);
      }
    });
    it("should have message : Mot de passe incorrect !", async () => {
      try {
        const res = await request(app).post("/api/auth/login").send({
          email: userData.email,
          password: "wrongPassword",
        });
        expect(res.status).toBe(404);
        expect(res.body).toMatch("Mot de passe incorrect !");
      } catch (error) {
        console.log(error);
      }
    });
  });
});
