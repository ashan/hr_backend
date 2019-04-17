"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var users_1 = __importDefault(require("./routes/api/users"));
var posts_1 = __importDefault(require("./routes/api/posts"));
var profile_1 = __importDefault(require("./routes/api/profile"));
var keys_1 = __importDefault(require("./config/keys"));
var passport_1 = __importDefault(require("./config/passport"));
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// connect to db
mongoose_1.default.connect(keys_1.default.mongoURI, { useNewUrlParser: true });
var db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () { return console.log.bind(console, 'MongoDB connected'); });
// passport middleware
passport_1.default.init(app);
// api routes
app.use('/api/users', users_1.default);
app.use('/api/posts', posts_1.default);
app.use('/api/profile', profile_1.default);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () { return console.log("Listening on " + PORT); });
//# sourceMappingURL=server.js.map