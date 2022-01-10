"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = '13000';
const app = (0, express_1.default)();
app.get('/', (req, res, next) => {
    res.send('init');
});
app.listen(PORT, () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: ${PORT}🛡️
    ################################################
  `);
});
