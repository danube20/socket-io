import { useEffect, useState } from "react"
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = ({ socket, username, room }) => {

    const [currentMessage, setCurrentMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            }
            await socket.emit('send_message', messageData)
            setMessageList((list) => [...list, messageData])
            setCurrentMessage('')
        }
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [socket])

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className='message-container'>
                    {messageList.map((elm, idx) => {
                        return (
                            <div key={idx} className="message" id={username !== elm.author ? 'you' : 'other'}>
                                <div className="">
                                    <div className="message-content">
                                        <p>{elm.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{elm.time}</p>
                                        <p id="author">{elm.author}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Hello!..."
                    onChange={e => setCurrentMessage(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()} />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat