"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// interface IComment extends model {
//   blogId: mongoose.Types.ObjectId;
// }
const SchemaComment = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    comment: { type: String, required: true },
    status: { type: Boolean, required: true, default: true },
    blogId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'blog' },
    date: { type: Date, required: true, default: new Date() },
});
exports.default = (0, mongoose_1.model)('Comments', SchemaComment);
