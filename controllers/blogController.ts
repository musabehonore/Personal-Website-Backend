import { Request, Response } from "express";
import mongoose from "mongoose";
import { Error } from "mongoose";

const schema = new mongoose.Schema({
  title: String,
  content: String
});

const Blog = mongoose.model("Blog", schema);

const blogController = {
  getAllBlogs: async (req: Request, res: Response) => {
    try {
      const blogs = await Blog.find();
      res.json(blogs);
    } catch (err: any) {
      res.status(500).json({ message: (err as Error).message });
    }
  },
  createBlog: async (req: Request, res: Response) => {
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content
    });

    try {
      const newBlog = await blog.save();
      res.status(201).json(newBlog);
    } catch (err: any) {
      res.status(400).json({ message: (err as Error).message });
    }
  },
  getBlogById: async (req: Request, res: Response) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (blog == null) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json(blog);
    } catch (err: any) {
      return res.status(500).json({ message: (err as Error).message });
    }
  },
  updateBlog: async (req: Request, res: Response) => {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedBlog);
    } catch (err: any) {
      return res.status(500).json({ message: (err as Error).message });
    }
  },
  deleteBlog: async (req: Request, res: Response) => {
    try {
      await Blog.findByIdAndDelete(req.params.id);
      res.json({ message: "Blog deleted" });
    } catch (err: any) {
      return res.status(500).json({ message: (err as Error).message });
    }
  }
};

export default blogController;
