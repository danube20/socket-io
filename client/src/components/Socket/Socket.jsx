import io from 'socket.io-client'

const socket = io.connect('//localhost:5005')

export default socket