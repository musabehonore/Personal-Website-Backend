"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    title: String,
    content: String
});
const Blog = mongoose_1.default.model("Blog", schema);
const blogController = {
    getAllBlogs: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const blogs = yield Blog.find();
            res.json(blogs);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }),
    createBlog: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const blog = new Blog({
            title: req.body.title,
            content: req.body.content
        });
        try {
            const newBlog = yield blog.save();
            res.status(201).json(newBlog);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    }),
    getBlogById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const blog = yield Blog.findById(req.params.id);
            if (blog == null) {
                return res.status(404).json({ message: "Blog not found" });
            }
            res.json(blog);
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }),
    updateBlog: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedBlog = yield Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(updatedBlog);
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }),
    deleteBlog: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Blog.findByIdAndDelete(req.params.id);
            res.json({ message: "Blog deleted" });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    })
};
exports.default = blogController;
