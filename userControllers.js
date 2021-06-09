const mongoose = require('mongoose')
const User = require('../models/User')

const sha256 = require('js-sha256')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const {name, email, password} = req.body

    const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@outlook.com|@live.com/

    if (!emailRegex.test(email)) throw 'Your Email domain is not supported.'
    if (password.length < 6) throw 'Your password needs to be at least 6 characters long.'

    const userExists = await User.findOne({
        email,

    })
    if (userExists) throw 'User already exists.'

    const user = new User ({ name, email, password: sha256(password + process.env.SALT),
    })


    await user.save()

    res.json({
        message: 'User [' + name + '] registered successfully!'
    })
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({
        email,
        password: sha256(password + process.env.SALT),
    })
  if (!user) throw 'Email and Password doesnt`t match!'

  const token = await jwt.sign({id: user.id}, process.env.SECRET)

  res.json({
      message: 'User logged in successfully!',
      token,
  })
}