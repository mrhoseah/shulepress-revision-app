"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("~/config"));
const routes_1 = __importDefault(require("~/routes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set('views', path_1.default.join(__dirname, 'templates'));
app.set('view engine', 'ejs');
app.use(express_1.default.static('public'));
app.use((0, cors_1.default)({ credentials: true, origin: config_1.default.clientUrl }));
app.get('/', (req, res) => {
    res.json("You're here!");
});
app.use('/api/', routes_1.default);
app.listen(config_1.default.port, () => {
    console.log(`server running on http://localhost:${config_1.default.port}`);
});
//# sourceMappingURL=app.js.map