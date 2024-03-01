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
exports.QueriesController = void 0;
const Queries_1 = __importDefault(require("../models/Queries"));
const queriesValidation_1 = require("../validations/queriesValidation");
class QueriesController {
    getAllQueries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queries = yield Queries_1.default.find();
                res.json({ queries, message: 'These are the Queries' });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getQueryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const query = yield Queries_1.default.findById(id);
                if (!query) {
                    return res.status(404).json({ message: 'Query not found' });
                }
                res.json({ query, message: 'This is the Query' });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    createQuery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, message } = req.body;
                const { error } = queriesValidation_1.queryVal.validate(req.body);
                if (error) {
                    return res.status(400).json({ error: error.details[0].message });
                }
                const query = new Queries_1.default({
                    name,
                    email,
                    message,
                    date: new Date(),
                });
                const savedQuery = yield query.save();
                res.status(201).json({ Query: savedQuery, message: 'Your Query is sent successfully' });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    deleteQuery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Queries_1.default.findByIdAndDelete(req.params.id);
                res.send({ message: "Query deleted!!" });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
}
exports.QueriesController = QueriesController;
