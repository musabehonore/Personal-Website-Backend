"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController_1 = __importDefault(require("../controllers/blogController"));
const router = express_1.default.Router();
router.get("/blogs", blogController_1.default.getAllBlogs);
router.post("/blogs", blogController_1.default.createBlog);
router.get("/blogs/:id", blogController_1.default.getBlogById);
router.patch("/blogs/:id", blogController_1.default.updateBlog);
router.delete("/blogs/:id", blogController_1.default.deleteBlog);
exports.default = router;
