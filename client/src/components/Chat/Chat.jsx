import { useState, useEffect } from "react"
import socket from './../Socket/Socket'
const Chat = ({ name }) => {

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket.emit('conectado', name)
    }, [name])

    useEffect(() => {
        socket.on('messages', message => {
            setMessages([...messages, message])
        })

        return () => {
            socket.off()
        }
    }, [messages])

    const handleSubmit = e => {
        e.preventDefault()

        socket.emit('mensaje', name, message)
        setMessage('')
    }

    console.log(messages);

    return (
        <div>
            <div>
                {messages.map((elm, idx) => <div key={idx}><p>{elm.message}</p></div>)}
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Escriba el mensaje:</label>
                <textarea name="" id="" cols="30" rows="10" onChange={(e) => setMessage(e.target.value)} value={message}></textarea>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default Chat