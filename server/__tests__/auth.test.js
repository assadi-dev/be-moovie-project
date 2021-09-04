const request = require("supertest");
const app = require("../app");
const UserModel = require("../models/user.model");

const userData = {
  pseudo: "testPseudo",
  email: "test@email.com",
  confirmPassword: "Password123",
  password: "Password123",
  birthday: "1993-03-08",
  presentation: "",
};

beforeEach(async () => {
  UserModel.deleteMany({});
});
describe("Test Auth path", () => {
  describe("When add user", () => {
    jest.setTimeout(30000);
    test("should respond with 201 status code", async () => {
      const res = await request(app).post("/api/auth/signin").send({
        pseudo: "bibi23",
        password: "Password123",
        confirmPassword: "Password123",
        email: "425azer@email.com",
        birthday: new Date(),
        presentation: "",
      });
      expect(res.status);
    });
  });
  describe("When Username and password are ok", () => {
    jest.setTimeout(30000);
    test("should respond with 200 status code", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "425azer@email.com",
        password: "Password123",
      });
      expect(res.status);
      console.log(res.body);
    });
  });
  //describe("When Username and password are wrong", () => {});
});
