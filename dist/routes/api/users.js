"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var bcrypt_1 = __importDefault(require("bcrypt"));
var gravatar_1 = __importDefault(require("gravatar"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var passport_1 = __importDefault(require("passport"));
var User_1 = __importDefault(require("../../models/User"));
var keys_1 = __importDefault(require("../../config/keys"));
var router = express_1.Router();
// @router  GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', function (req, res) {
    return res.json({ mst: 'Users Works' });
});
// @router  GET api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var email, user, password, avatar, salt, hashedPassword, newUser, userDoc;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (user) {
                    return [2 /*return*/, res.status(400).json({
                            email: 'User already exists'
                        })];
                }
                password = req.body.password;
                avatar = gravatar_1.default.url(email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 2:
                salt = _a.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
            case 3:
                hashedPassword = _a.sent();
                newUser = new User_1.default({
                    name: req.body.name,
                    email: email,
                    avatar: avatar,
                    password: hashedPassword
                });
                return [4 /*yield*/, newUser.save()];
            case 4:
                userDoc = _a.sent();
                res.json({ userDoc: userDoc });
                return [2 /*return*/];
        }
    });
}); });
// @router  GET api/users/login
// @desc    User login returning a JWT Token
// @access  Public
router.post('/login', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var email, password, user, passwordsMatch, payload, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                password = req.body.password;
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({ email: 'User not found' })
                        // match the password
                    ];
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 2:
                passwordsMatch = _a.sent();
                if (!passwordsMatch)
                    return [2 /*return*/, res.status(400).json({ password: 'Password incorrect' })];
                payload = {
                    userId: user.id,
                    name: user.name,
                    avatar: user.avatar
                };
                token = jsonwebtoken_1.default.sign(payload, keys_1.default.secretOrKey, { expiresIn: 3600 });
                res.json({ success: true, token: "Bearer " + token });
                return [2 /*return*/];
        }
    });
}); });
// @router  GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport_1.default.authenticate('jwt', { session: false }), function (req, res) {
    return res.json(req.user);
});
exports.default = router;
//# sourceMappingURL=users.js.map