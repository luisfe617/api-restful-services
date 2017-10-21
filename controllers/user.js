'use strict';

const User = require('../models/user');
const service = require('../services');

function signUp(req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })

  user.save(function (err) {
    if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })

    return res.status(201).send({ token: service.createToken(user) })
  })
}

function signIn(req, res) {

  console.log("User login request", req);

  User.find({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send({ message: err });
    if (!user || user.length == 0) return res.status(404).send({ message: 'No existe el usuario' });

    req.user = user;
    res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user),
      user: user
    })
  })
}

module.exports = {
  signUp,
  signIn
}