"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://localhost:27017/myBlogsDatabase')
    .then(() => {
    console.log('Connected to MongoDB !! ');
    index_1.default.listen(7000, () => {
        console.log(`Server is running on port 7000`);
    });
})
    .catch((error) => {
    console.error('Error in connecting to MongoDB:', error);
});
exports.default = index_1.default;
