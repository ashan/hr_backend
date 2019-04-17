"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
// @router  GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get('/test', function (req, res) {
    return res.json({ mst: 'Posts Works' });
});
exports.default = router;
//# sourceMappingURL=posts.js.map