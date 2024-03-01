"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
const app = (0, express_1.default)();
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.get('/api/*', (req, res) => {
    res.status(404).json({ message: 'API Not Found' });
});
// mongoose.connect('mongodb://localhost:27017/myBlogsDatabase')
//   .then(() => {
//     console.log('Connected to MongoDB !! ');
//     app.listen(7000, () => {
//       console.log(`Server is running on port 7000`);
//     });
//   })
//   .catch((error) => {
//     console.error('Error in connecting to MongoDB:', error);
//   });
exports.default = app;
