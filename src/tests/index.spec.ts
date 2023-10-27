const request = require("supertest");
const expect = require("chai").expect;
import app from '../index'
const mongoose = require("mongoose");

describe("API Tests", function () {
  let postId:any;

  after(() => {
    mongoose.disconnect();
    console.log("Test database connection closed"); // eslint-disable-line
  });

  describe("GET /api/posts", () => {
    it("should retrieve a list of all blog posts", async () => {
      const res = await request(app).get("/api/posts");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });

  describe("POST /api/posts", () => {
    it("should create a new blog post", async () => {
      const newPost = {
        title: "Test Post",
        content: "This is a test post content.",
        category_id: 1,
      };
      const res = await request(app).post("/api/posts").send(newPost);
      expect(res.body).to.be.an("object");
      postId=res.body._id;
    });
  });

  describe("GET /api/posts/:id", () => {
    it("should retrieve a specific blog post by its ID", async () => {
      const res = await request(app).get(`/api/posts/${postId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });
  });

  describe("PUT /api/posts/:id", () => {
    it("should update an existing blog post", async () => {
      const updatedPost = {
        title: "Updated Post Title",
        content: "Updated post content.",
      };
      const res = await request(app)
        .put(`/api/posts/${postId}`)
        .send(updatedPost);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });
  });

  describe("DELETE /api/posts/:id", () => {
    it("should delete a blog post", async () => {
      const res = await request(app).delete(`/api/posts/${postId}`);
      expect(res.status).to.equal(200);
    });
  });

  describe("GET /api/posts/latest", () => {
    it("should retrieve the latest blog post from each unique category", async () => {
      const res = await request(app).get("/api/posts/latest");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });
});
