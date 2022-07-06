const express = require("express");
const http = require('http')
const path = require("path");
const socketio = require('socket.io')


const app = express();
const server = http.createServer(app)
const io = socketio(server)


const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

const welcome = 'Welcome Users'

io.on('connection',(socket)=>{ 
	socket.emit('message',welcome) 

	socket.on('sendMessage',(message)=>{
		io.emit('message',message)
	})

	socket.broadcast.emit('message', 'new user have joined this')

	socket.on('sendLocation',(positions)=>{
		io.emit('message',`https://google.com/maps?q=${positions.latitude},${positions.longitude}`)
	})


	socket.on('disconnect',()=>{
		io.emit('message','A user have left')
	})



})
 
server.listen(port, () => {
	console.log(`Server is up on ${port}!`);
});



// let count = 0

//  io.on('connection',(socket)=>{
// 	// console.log('new websocket connection',count)

// 	socket.emit("countUpdated",count)
// 	socket.on('increment',()=>{
// 		count++
// 		// socket.emit("countUpdated",count)
// 		io.emit("countUpdated",count)
// 	})
//  })
