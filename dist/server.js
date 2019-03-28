"use strict";
// /src/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var port = process.env.PORT || 5437;
app_1.default.listen(port, function () {
    console.log("GSEC dashboard API has started successfully at PORT: " + port);
});
//# sourceMappingURL=server.js.map