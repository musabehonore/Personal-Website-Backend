"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./src/routes"));
mongoose_1.default
    .connect("mongodb://localhost:27017/myBlogsDatabase")
    .then(() => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use("/api", routes_1.default);
    app.listen(9000, () => {
        console.log(`Server has started!`);
    });
});
