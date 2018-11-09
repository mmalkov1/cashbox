const router = require("express").Router();
const Users = require('../db/schemas/users');
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");

const Op = Sequelize.Op;
//получаем данные пользователя
router.get("/user", function(req, res, next) {
  if (!req.headers["x-auth-token"]) {
    return res.sendStatus(401);
  }
  try {
    var auth = jwt.decode(req.headers["x-auth-token"], "secretkey");
  } catch (err) {
    return res.status(401).send();
  }
  Users.findOne({ 
    where: {
      'username': auth.username
    }
   })
    .then(user=>res.status(200).send(user))
    .catch(err=>res.status(400).send(err))
});
//проверяем логин/пароль и полуучаем токен
router.post("/login", function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    // если один или оба параметра запроса опущены,
    // возвращаем 400 - Bad Request
    return res.sendStatus(400);
  } else {
    console.log(req.body.username);
    var username = req.body.username;
    var password = req.body.password;
    Users.findOne({
      where: {
        'username': username 
      }
    })
      // указываем явно, что нам нужно значение поля password
      // (ибо его выборка отключена в модели)
      
      .then(user => {
        if (!user) {
          return res.sendStatus(401);
        }
        bcrypt.compare(password, user.password, function(err, valid) {
          if (err) {
            return res.sendStatus(500);
          }
          if (!valid) {
            return res.sendStatus(401);
          }
          var token = jwt.encode({ login: username }, 'secretkey');
          res.status(200).send({"token": token});
        });
      });
  }
});
//добавление пользователя
router.post("/", function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  let role = req.body.role;
  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      res.sendStatus(500);
    } else {
      password = hash;
      Users.create({
        username: username,
        password: hash,
        role: role
      }).then(productRes => res.status(201).send(productRes));
    }
  });
});

module.exports = router;
