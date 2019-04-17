"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
// @router  GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', function (req, res) {
    return res.json({ mst: 'Profile Works' });
});
exports.default = router;
//# sourceMappingURL=profile.js.map