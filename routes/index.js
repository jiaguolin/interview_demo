var express = require('express');
var router = express.Router();
var _ = require('underscore');

var users = {};

/* GET home page. */
router.post('/signup', function (req, res, next) {

  if (_.values(users).length === 0) {
    users[req.body.name] = req.body;
    res.json({ code: 200, info: '注册成功' });
    res.end();
    return;
  }
  var user = _.where(users, { name: req.body.name });
  if (user.length !== 0) {
    res.json({ code: 1, info: '用户名已存在' });
    res.end();
    return
  }
  users[req.body.name] = req.body;
  res.json({ code: 200, info: '注册成功' });
  res.end();
})

router.post('/login', function (req, res, next) {
  var user = _.where(users, { name: req.body.name });
  if (user.length === 0) {
    res.json({ code: 1, info: '用户不存在' });
    res.end();
    return;
  }

  if (req.body.password !== user[0].password) {
    res.json({ code: 2, info: '用户密码错误' });
    res.end();
    return;
  }

  req.session.user = req.body;
  res.json({ code: 200, info: '登录成功' });
  res.end();
})

router.get('/getUser', function (req, res, next) {
  // if (req.session.user) {
    res.json({ code: 200, data: _.values(users), me: req.session.user });
    res.end();
    //test
    // return;
  // }
  // res.json({ code: 401, info: '会话过期,需要重新登录' });
  // res.end();
})

router.get('/logout', function (req, res, next) {
  delete req.session.user
  res.json({ code: 200, info: '退出成功' });
  res.end();
})

module.exports = router;
