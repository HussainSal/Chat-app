const socket = io()

socket.on('message',(message)=>{
    console.log(message)

})


document.querySelector('#message-form').addEventListener('submit',(e)=>{
    e.preventDefault()
    const message = e.target.elements.message.value
  
    socket.emit('sendMessage',message)
})

document.querySelector('#send-location').addEventListener('click',(e)=>{
    if( !navigator.geolocation){
        return alert('your browser does not support geolocation')
    }

    navigator.geolocation.getCurrentPosition((position)=>{
       const positions = {
            latitude :position.coords.latitude,longitude:position.coords.longitude
        }
        
        socket.emit('sendLocation',positions)
    })
});


// PRACTICE NOTE
// const socket = io()

// socket.on('countUpdated',(count)=>{
//     console.log('count updated new', count )
// })    

// document.querySelector('#increment').addEventListener('click',()=>{
//     console.log('clicked');
//     socket.emit('increment')
// })