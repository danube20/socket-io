import { useState } from "react"

const IndexPage = () => {

    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')

    const joinRoom = () => {
        if (username !== '' && room !== '') {

        }
    }

    return (
        <div className="homepage">
            <h3>Join a chat</h3>
            <input type="text" placeholder="Your name..." onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder="Room ID..." onChange={(e) => setRoom(e.target.value)} />
            <button>Join room</button>
        </div>
    )
}

export default IndexPage