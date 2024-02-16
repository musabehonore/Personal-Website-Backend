import express from "express";
import Blog from "../models/Blog";
import { Request, Response } from "express";
import blogController from "../controllers/blogController";

const router = express.Router();

router.get("/blogs", blogController.getAllBlogs);
router.post("/blogs", blogController.createBlog);
router.get("/blogs/:id", blogController.getBlogById);
router.patch("/blogs/:id", blogController.updateBlog);
router.delete("/blogs/:id", blogController.deleteBlog);

export default router;