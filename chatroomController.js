const mongoose = require('mongoose')
const Chatroom = mongoose.model('Chatroom')

exports.createChatroom = async (req, res) => {
    const {name} = req.body

    const nameRegex = /^[A-Za-z\s]+$/

    if (!nameRegex.test(name)) throw 'Chatroom name can only contain alphabets.'

    const chatroomExists = await Chatroom.findOne({name})

    if (chatroomExists) throw 'Chatroom already exists.'

    const chatroom = new Chatroom({
        name,
    })

    await chatroom.save()

    res.json({
        message: 'Chatroom created!',
    })
 }