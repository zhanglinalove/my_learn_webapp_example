var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('zhangsan lisi , wangwu , kaishi !');
});

module.exports = router;
