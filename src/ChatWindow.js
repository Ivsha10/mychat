import { BiArrowBack } from 'react-icons/bi'
import { AiOutlineSend } from 'react-icons/ai'
import { useEffect, useRef } from 'react';


const ChatWindow = ({ setHasEntered, enteredChatWith, currentChat, message, setMessage, sendMessage, currentUser, setWantsNewChat, userChats }) => {
    const bottomEl = useRef(null);
    useEffect(() => {
        scrollToBottom();
    }, [currentChat])
    const scrollToBottom = () => {
        bottomEl?.current?.scrollIntoView({ behavior: 'smooth' });
    };


    return (
        <main className='chatsContainer'> {/* Chat window */}
            <div className='chatContainer' >
                <ul>
                    <BiArrowBack className='backBtn' onClick={() => { setHasEntered(false); setWantsNewChat(false) }} />
                    <label className='friendName'>{enteredChatWith.fullName}</label>
                </ul>
                <div className='chatArea' style={{ backgroundColor: 'black' }}>
                    {currentChat && currentChat.map(message => message.sender === currentUser ?
                        <div key={currentChat.indexOf(message)} className={'userMessage'}> {message.content} </div> :
                        <div key={currentChat.indexOf(message)} className={'friendMessage'}> {message.content} </div>
                    )}
                    <div ref={bottomEl} ></div>
                </div>
                <div className='chatInputBar'>
                    <textarea type='text' className='messageInput' placeholder='Type a message' value={message} onChange={(e) => { setMessage(e.target.value) }} />
                    <AiOutlineSend className='btnSend' onClick={() => { message &&  sendMessage(); }} />
                </div>
            </div>
        </main>
    )
}

export default ChatWindow
