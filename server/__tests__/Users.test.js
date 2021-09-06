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
const movieId = "550988";

beforeAll(async () => {
  dbConnect();

  user = await createUser(userData);
  await new userModel(user).save();
});
afterAll(async () => {
  dbDisconnect();
});

describe("Test User PATH", () => {
  describe("User Login", () => {
    it("Should be have token && refresh property", async () => {
      try {
        const res = await request(app).post("/api/auth/login").send({
          email: userData.email,
          password: userData.password,
        });
        expect(Promise.resolve(res.status)).resolves.toBe(200);
        expect(Promise.resolve(res.body)).resolves.toHaveProperty("token");
        expect(Promise.resolve(res.body)).resolves.toHaveProperty(
          "refreshToken"
        );
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
        expect(Promise.resolve(res.status)).resolves.toBe(200);
        expect(Promise.resolve(res.body)).resolves.toBeDefined();
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
        await expect(Promise.resolve(res.status)).resolves.toBe(200);
        await expect(Promise.resolve(res.body.pseudo)).resolves.toMatch(
          "editPseudoUser"
        );
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

        await expect(Promise.resolve(res.status)).resolves.toBe(200);
        await expect(Promise.resolve(res.body.following)).resolves.toContain(
          idTofollow
        );
        console.table(`following : ${res.body.following}`);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe("When user unfollow", () => {
    it("Shouldn't have the id to unfollow on followig table", async () => {
      const id = getUserId(token);
      const expected = [idTofollow];
      try {
        const res = await request(app)
          .patch(`/api/user/unfollow/${idTofollow}`)
          .set("Authorization", "Bearer " + token);

        expect(Promise.resolve(res.status)).resolves.toBe(200);
        expect(Promise.resolve(res.body.following)).resolves.toEqual(
          expect.not.arrayContaining(expected)
        );
        console.table(`user following has been removed !`);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe("When add Movie on favorie", () => {
    it("Should have the movie's id  to movie table", async () => {
      const id = getUserId(token);

      try {
        const res = await request(app)
          .patch(`/api/user/movies/add/${movieId}`)
          .set("Authorization", "Bearer " + token);

        await expect(Promise.resolve(res.status)).resolves.toBe(200);
        await expect(Promise.resolve(res.body.movies)).resolves.toContain(
          movieId
        );
        console.log(`${res.body.movies}`);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe("When remove Movie on favorie", () => {
    it("Shouldn't have the movie's id to movie table", async () => {
      const id = getUserId(token);
      const expected = [movieId];

      try {
        const res = await request(app)
          .patch(`/api/user/movies/remove/${movieId}`)
          .set("Authorization", "Bearer " + token);

        await expect(Promise.resolve(res.status)).resolves.toBe(200);
        await expect(Promise.resolve(res.body.movies)).resolves.toEqual(
          expect.not.arrayContaining(expected)
        );

        console.log(`movie has been removed`);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
