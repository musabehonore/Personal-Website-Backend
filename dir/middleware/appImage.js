"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const appImage = (0, express_1.default)();
appImage.use(body_parser_1.default.urlencoded({
    extended: false
}));
appImage.use(body_parser_1.default.json());
module.exports = appImage;
