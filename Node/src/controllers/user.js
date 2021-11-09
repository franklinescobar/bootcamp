const User = require('../models/user');
// var bodyParser = require('body-parser');
// const { json } = require('express');
// var app =  json;
// app.use(body);



module.exports.createUser = (req, res, next) => {
  const args = [req.user.uid, req.user.email, req.body.title];


  console.log("veamos" + args);
  User.create(args) 
  .then(() => res.status(200).json({ valid: true, message: 'User created!' }))
  .catch((e) => res.status(400).json({ valid: false, message: e }));
}