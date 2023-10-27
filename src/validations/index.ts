import { body, param, query ,validationResult} from "express-validator";
import  { Request, Response, NextFunction } from "express";

// Validation Middleware for POST /api/posts
const createBlogPostValidation = [
  body("title").notEmpty().isString(),
  body("content").notEmpty().isString(),
  body("category_id").notEmpty().isInt(),
];

// Validation Middleware for PUT /api/posts/:id
const updateBlogPostValidation = [
  param("id").isMongoId(),
  body("title").notEmpty().isString(),
  body("content").notEmpty().isString(),
];

// Validation Middleware for GET /api/posts/:id
const getBlogPostByIdValidation = [param("id").isMongoId()];

// Validation Middleware for DELETE /api/posts/:id
const deleteBlogPostValidation = [param("id").isMongoId()];

// Validation Middleware for GET /api/posts (optional query parameters)
const getBlogPostsValidation = [
  query("page").optional().isInt(),
  query("limit").optional().isInt(),
];

const validateResult= (req: Request, res: Response, next: NextFunction) => {
    const err = validationResult(req);
    console.log(err);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }
    next();
  }

export {
  createBlogPostValidation,
  updateBlogPostValidation,
  getBlogPostByIdValidation,
  deleteBlogPostValidation,
  getBlogPostsValidation,
  validateResult
};
