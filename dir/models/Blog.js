"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Blog = new mongoose_1.Schema({
    title: { type: String, required: true },
    image: { type: String },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 }
});
exports.default = (0, mongoose_1.model)('Blog', Blog);
