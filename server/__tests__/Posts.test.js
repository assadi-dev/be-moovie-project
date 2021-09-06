const request = require("supertest");
const app = require("../app");
const { dbConnect, dbDisconnect } = require("../db/db_handler");
const userModel = require("../models/user.model");
const { createUser } = require("../services/test.service");
const { getUserId } = require("../services/user.services");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

var token = "";
var postId = "";
var postIdFile = "";
var userId = "";
const fileTestPath = path.join(__dirname, "testFile.jpg");

const userData = {
  pseudo: "user2",
  email: "user2@email.com",
  password: "PasswordX123",
  birthday: "1993-03-08",
  presentation: "",
};

beforeAll(async () => {
  dbConnect();
  /*let user = await createUser(userData);
  await userModel(user).save();*/
});
afterAll(async () => {
  //dbDisconnect();
});

describe("Test Post PATH", () => {
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
        userId = id;
        console.log(`userId : ${userId}`);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe("When create Post without file", () => {
    it("Should be have 201 status code ", async () => {
      const res = await request(app)
        .post("/api/post/add")
        .send({
          author: userId,
          pseudo: userData.pseudo,
          message: "New Post message",
        })
        .set("Authorization", "Bearer " + token);
      expect(Promise.resolve(res.status)).resolves.toBe(201);
      console.table(res.body);
      postId = res.body._id;
    });
  });

  describe("When create Post with file", () => {
    it("Should be have 201 status code ", async () => {
      const res = await request(app)
        .post("/api/post/add")
        .set("Authorization", "Bearer " + token)
        .set("content-type", "multipart/form-data")
        .field("author", userId)
        .field("pseudo", userData.pseudo)
        .field("message", "New post with file")
        .attach("picture", fileTestPath);
      expect(res.status).toEqual(201);
      console.table(res.body.media);
      postIdFile = res.body._id;
    });
  });

  describe("When Like Post", () => {
    it("Should have postId on postLike of user & status code 200", async () => {
      const res = await request(app)
        .patch(`/api/user/postLike/add/${postId}`)
        .set("Authorization", "Bearer " + token);
      expect(res.status).toEqual(200);
      console.table("postLikes :" + res.body.postLikes);
    });
  });

  describe("When unLike Post", () => {
    it("Should have remove postId on postLike && return status code 200", async () => {
      const res = await request(app)
        .patch(`/api/user/postLike/remove/${postId}`)
        .set("Authorization", "Bearer " + token);
      expect(res.status).toEqual(200);
      console.table("postLikes :" + res.body.postLikes);
    });
  });

  describe("when edit post", () => {
    it("Should have edit post message & return 200 status code", async () => {
      const expected = "message post has been edited";
      const res = await request(app)
        .put(`/api/post/edit/${postId}`)
        .set("Authorization", "Bearer " + token)
        .send({
          message: expected,
        });
      expect(res.status).toEqual(200);
      expect(res.body.message).toMatch(expected);
      console.log("post message : " + res.body.message);
    });
  });

  describe("when delete post", () => {
    it("Should have delete & return 200 status code", async () => {
      const expected = `le poste ${postId} à été supprimé`;
      const res = await request(app)
        .delete(`/api/post/delete/${postId}`)
        .set("Authorization", "Bearer " + token);

      expect(res.status).toEqual(200);
      expect(res.body.message).toMatch(expected);
      console.log("post message : " + res.body.message);
    });
  });
  describe("when delete post with file", () => {
    it("Should have delete & return 200 status code", async () => {
      const expected = `le poste ${postIdFile} à été supprimé`;
      const res = await request(app)
        .delete(`/api/post/delete/${postIdFile}`)
        .set("Authorization", "Bearer " + token);

      expect(res.status).toEqual(200);
      expect(res.body.message).toMatch(expected);
      console.log("post message : " + res.body.message);
    });
  });
});
