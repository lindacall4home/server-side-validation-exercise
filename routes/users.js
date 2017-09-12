'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/' , (req, res, next) => {
  knex('users')
    .select( 'id', 'firstname', 'lastname', 'username', 'phone', 'email')
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post('/' , (req, res, next) => {
  let firstName = req.body.users.firstName;
  let lastName = req.body.users.lastName;
  let username = req.body.users.username;
  let email = req.body.users.email;
  let phone = req.body.users.phone;

  if(!firstName || firstName.trim() === ''){
    const err = new Error('First name must not be blank');
    err.status = 400;

    return next(err);
  }

  if(!lastName || lastName.trim() === ''){
    const err = new Error('Last name must not be blank');
    err.status = 400;

    return next(err);
  }

  if (!username || username.trim().length <= 6) {
     const err = new Error('Username must not be blank and must be at least 6 characters');
     err.status = 400;

     return next(err);
   }

   let regExp = /^[a-zA-Z][a-zA-Z0-9]*$/;

   if (!regExp.test(username)) {

     const err = new Error('Username must start with a letter and must not contain punctuation');

     err.status = 400;

     return next(err);
   }

  if (!email || email.trim() === '') {
     const err = new Error('Email must not be blank');
     err.status = 400;

     return next(err);
   }

   let regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

   if(!regExEmail.test(email)){
     const err = new Error('Email must be a valid');
     err.status = 400;

     return next(err);

   }


  if (!phone || phone.trim().length != 10) {
    const err = new Error('Phone must not be blank and must be 10 characters');
    err.status = 400;

    return next(err);
  }

  knex('users')
    .insert({
      firstname: firstName,
      lastname: lastName,
      username: username,
      email: email,
      phone: phone
    })
    .returning(['firstname', 'lastname', 'username','phone','email'])
    .then((results) => {
      res.send(results[0]);
    })
    .catch((err) => {
      next(err);
    });
});


router.use((err, _req, res, _next) => {
  if (err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  console.error(err);
  res.sendStatus(500);
});

module.exports = router;
