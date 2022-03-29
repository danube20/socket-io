import { useState } from "react"
import Chat from "../../components/Chat/Chat"
import socket from '../../components/Socket/Socket'

const IndexPage = () => {

    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')
    const [showChat, setShowChat] = useState(false)

    const joinRoom = () => {
        if (username !== '' && room !== '') {
            socket.emit('join_room', room)
            setShowChat(true)
        }
    }

    return (
        <div className="App">
            <div className="joinChatContainer">
                {!showChat ?
                    <>
                        <h3>Join a chat</h3>
                        <input type="text" placeholder="Your name..." onChange={(e) => setUsername(e.target.value)} />
                        <input type="text" placeholder="Room ID..." onChange={(e) => setRoom(e.target.value)} />
                        <button onClick={joinRoom}>Join room</button>
                    </>
                    :
                    <Chat socket={socket} username={username} room={room} />
                }
            </div>
        </div>
    )
}

export default IndexPage