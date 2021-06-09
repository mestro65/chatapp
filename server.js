var express = require("express")
var bodyParser = require('body-parser')
require('dotenv').config();
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')
var port = process.env.PORT || 3010








app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())





var Message = mongoose.model('Message', {
    name : String,
    message: String
})



app.get('/messages', (req,res)=>{
    Message.find({}, (err,messages) =>{
        res.send(messages)
    })

})
app.post('/messages', (req, res) =>{
    var message = new Message(req.body)

    message.save((err) => {
        if (err) {
            res.sendStatus(500)
            io.emit('message', req.body)
            (res.sendStatus(200))
        }
        })
    })


    io.on('connection', (socket) => {
        console.log("user connected")
    })

    mongoose.connect(process.env.DATABASE,{

        useUnifiedTopology: true,
        useNewUrlParser: true,
    });

mongoose.connection.on("error", (err) => {
    console.log("Mongoose connection failed ERROR: " + err.message);
});

mongoose.connection.once("open", () => {
    console.log('Successfully connected to MongoDB')
})





    var server = http.listen(port, () => {

        console.log("SERVER WORKS AT PORT %d", port, "!!!!")
    })



