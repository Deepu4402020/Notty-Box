"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use('express');
//code
app.post("./api/v1/signin", (req, res) => {
});
app.post("./api/v1/signup", (req, res) => {
});
app.post("./api/v1/content", (req, res) => {
});
app.get("./api/v1/brain/:shareLink", (req, res) => {
});
app.listen(3000, () => {
    console.log("Server in UP");
});
