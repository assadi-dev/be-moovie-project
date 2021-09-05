const request = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const { dbConnect, dbDisconnect } = require("../db/db_handler");
const userModel = require("../models/user.model");
const { createUser } = require("../services/test.service");
const { getUserId } = require("../services/user.services");
require("dotenv").config();

var token = "";
const userData = {
  pseudo: "user",
  email: "user@email.com",
  password: "PasswordX123",
  birthday: "1993-03-08",
  presentation: "",
};

const idTofollow = "611fa816763c265534dc52db";

beforeAll(async () => {
  dbConnect();

  //user = await createUser();
  //await new userModel(user).save();
});
afterAll(async () => {
  //dbDisconnect();
});

describe("Test User PATH", () => {
  describe("User Login", () => {
    it("Should be have token && refresh property", async () => {
      try {
        const res = await request(app).post("/api/auth/login").send({
          email: userData.email,
          password: userData.password,
        });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("token");
        expect(res.body).toHaveProperty("refreshToken");
        token = res.body.token;
        const id = getUserId(token);
        console.log(`userId : ${id}`);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe("Get Data User", () => {
    it("Should have status 200 code", async () => {
      const id = getUserId(token);
      try {
        const res = await request(app)
          .get(`/api/user/${id}`)
          .set("Authorization", "Bearer " + token);
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
        console.table(res.body);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe("Edit Data User", () => {
    it("Should have status 200 code", async () => {
      const id = getUserId(token);
      try {
        const res = await request(app)
          .put(`/api/user/${id}`)
          .set("Authorization", "Bearer " + token)
          .send({
            pseudo: "editPseudoUser",
            email: "user@email.com",
            presentation: "test",
          });
        expect(res.status).toBe(200);
        expect(res.body.pseudo).toMatch("editPseudoUser");
        console.table(`new pseudo : ${res.body.pseudo}`);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe("When user follow", () => {
    it("Should have the id to follow on followig table", async () => {
      const id = getUserId(token);

      try {
        const res = await request(app)
          .patch(`/api/user/follow/${idTofollow}`)
          .set("Authorization", "Bearer " + token);

        expect(res.status).toBe(200);
        expect(res.body.following).toContain(idTofollow);
        console.table(`following : ${res.body.following}`);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe("When user unfollow", () => {
    it("Should have the id to unfollow on followig table", async () => {
      const id = getUserId(token);

      try {
        const res = await request(app)
          .patch(`/api/user/unfollow/${idTofollow}`)
          .set("Authorization", "Bearer " + token);

        expect(res.status).toBe(200);
        expect.not.arrayContaining(res.body.following);
        console.table(`user has been removed !`);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
