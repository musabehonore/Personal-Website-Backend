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
exports.BlogController = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const comments_1 = __importDefault(require("../models/comments"));
const response_1 = __importDefault(require("../utilities/response"));
const blogValidation_1 = require("../validations/blogValidation");
const commentValidation_1 = require("../validations/commentValidation");
const cloudinary_1 = __importDefault(require("../middleware/cloudinary"));
class BlogController {
    getAllBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogs = yield Blog_1.default.find();
                res.send({ blogs, message: 'These are the Blogs retrieved!' });
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        });
    }
    getBlogById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const blog = yield Blog_1.default.findById(id);
                const comments = yield comments_1.default.find({ blogId: id });
                const finalBlog = {
                    blog,
                    comments,
                };
                if (!blog) {
                    return res.status(404).send({ message: 'Blog not found' });
                }
                res.send({ finalBlog, message: 'This is the Blog!' });
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        });
    }
    createBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let image = null;
                if (req.file) {
                    const result = yield cloudinary_1.default.uploader.upload(req.file.path);
                    image = result ? result.secure_url : null;
                }
                const { title, content } = req.body;
                const { error } = blogValidation_1.blogVal.validate(req.body);
                if (error) {
                    return res.status(400).send({ error: error.details[0].message });
                }
                const blog = new Blog_1.default({
                    title,
                    content,
                    image,
                    date: new Date(),
                });
                const savedBlog = yield blog.save();
                res.status(201).send({ savedBlog, message: 'Blog created successfully!!' });
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        });
    }
    updateBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedBlog = yield Blog_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
                res.send({ updatedBlog, message: 'Blog updated!' });
            }
            catch (err) {
                return res.status(500).send({ message: err.message });
            }
        });
    }
    deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Blog_1.default.findByIdAndDelete(req.params.id);
                res.send({ message: "Blog deleted" });
            }
            catch (err) {
                return res.status(500).send({ message: err.message });
            }
        });
    }
    // comments functions
    CreateComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = new response_1.default(req, res);
            try {
                const { name, email, comment } = req.body;
                const { id: blogId } = req.params;
                // comments validations......
                const { error } = commentValidation_1.commentVal.validate(req.body);
                if (error) {
                    return res.status(400).send({ error: error.details[0].message });
                }
                const newComment = new comments_1.default({
                    name,
                    email,
                    comment,
                    blogId,
                    date: new Date(),
                });
                const savedComment = yield newComment.save();
                response.send(savedComment, 'Created a Comment !!', 201);
            }
            catch (error) {
                const errorMessage = error;
                response.send(null, errorMessage, 500);
            }
        });
    }
    getComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = new response_1.default(req, res);
            try {
                const { id: blogId } = req.params;
                const comments = yield comments_1.default.find({ blogId, status: true });
                response.send(comments, 'Here are the retrieved Comments', 200);
            }
            catch (error) {
                const errorMessage = error;
                response.send(null, errorMessage, 500);
            }
        });
    }
    editCommentStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: commentId } = req.params;
                const { status } = req.body;
                if (typeof status !== 'boolean') {
                    return res.status(400).json({ error: 'Invalid status value. Status must be a boolean.' });
                }
                const updatedComment = yield comments_1.default.findByIdAndUpdate(commentId, { status }, { new: true });
                if (!updatedComment) {
                    return res.status(404).json({ error: 'Comment not found.' });
                }
                res.status(200).json({ updatedComment, message: 'Comment status updated successfully.' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    ;
    // likes........
    likeBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const blog = yield Blog_1.default.findById(id);
                if (!blog) {
                    return res.status(404).send({ message: 'Blog not found' });
                }
                blog.likes++; // here i Incremented likes..
                yield blog.save();
                res.status(200).send({ likes: blog.likes, message: 'You liked!!' });
            }
            catch (error) {
                console.error(error);
                res.status(500).send({ message: 'Internal Server Error' });
            }
        });
    }
    getLikes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const blog = yield Blog_1.default.findById(id);
                if (!blog) {
                    return res.status(404).send({ message: 'Blog not found' });
                }
                const likes = blog.likes;
                res.status(200).send({ likes, message: 'These are the likes!' });
            }
            catch (error) {
                console.error(error);
                res.status(500).send({ message: 'Internal Server Error' });
            }
        });
    }
}
exports.BlogController = BlogController;
