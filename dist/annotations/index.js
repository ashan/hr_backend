"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
exports.AppRoute = function (config) {
    return function (target, propertyKey, descriptor) {
        var router = express_1.default.Router();
    };
};
exports.Get = function (config) {
    return function (target, propertyKey, descriptor) {
        console.log('=====');
        var router = express_1.default.Router();
        target.prototype.router = router;
        router.get(config.path, descriptor.value);
    };
};
//# sourceMappingURL=index.js.map