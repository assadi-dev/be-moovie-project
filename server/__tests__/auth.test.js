const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const authRoutes = require("../routes/auth.route");
const app = "http://1270.0.0.1:6500";
//const app = require("../app");
describe("Authentification", () => {
  it("Should to create a new user", async () => {
    const post = {
      pseudo: "new Pseudo",
      password: "passcrypted",
      confirmPassword: "passcrypted",
      email: "test@gmail.com",
      birthday: new Date(),
      presentation: "about me",
    };

    await request("http://1270.0.0.1:6500")
      .post("/api/auth/sigin")
      .send(post)
      .expect(201);
  });

  it("Should to Find On user with token", async () => {
    const post = {
      email: "test@gmail.com",
      password: "passcrypted",
    };

    await request("http://1270.0.0.1:6500")
      .post("/api/auth/login")
      .send({ post })
      .expect(200);
  });
});
