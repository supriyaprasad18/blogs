import express from "express";
const router = express.Router();
import {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  getLatestBlogPosts,
} from "../controllers";
import {
  createBlogPostValidation,
  deleteBlogPostValidation,
  getBlogPostByIdValidation,
  getBlogPostsValidation,
  updateBlogPostValidation,
  validateResult,
} from "../validations";

router.post(
  "/api/posts",
  createBlogPostValidation,
  validateResult,
  createBlogPost
);
router.get(
  "/api/posts",
  getBlogPostsValidation,
  validateResult,
  getAllBlogPosts
);
router.get("/api/posts/latest", getLatestBlogPosts);
router.get(
  "/api/posts/:id",
  getBlogPostByIdValidation,
  validateResult,
  getBlogPostById
);
router.put(
  "/api/posts/:id",
  updateBlogPostValidation,
  validateResult,
  updateBlogPost
);
router.delete(
  "/api/posts/:id",
  deleteBlogPostValidation,
  validateResult,
  deleteBlogPost
);

export { router as BlogRoutes };
