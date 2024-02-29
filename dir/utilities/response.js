"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomResponse {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    static success(data, message, status) {
        return {
            data,
            message,
            status,
        };
    }
    static error(data, message, status) {
        return {
            data,
            message,
            status,
        };
    }
    send(data, message, status) {
        return this.res.status(status).json({ data, message, status });
    }
}
exports.default = CustomResponse;
