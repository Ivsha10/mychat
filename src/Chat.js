import './chat.css'
import { BiArrowBack } from 'react-icons/bi'
import { IoCallOutline, IoAddOutline } from 'react-icons/io5';
import { AiOutlinePicture } from 'react-icons/ai'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { RiUserSmileLine } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ChatWindow from './ChatWindow'

const Chat = ({ accessToken, currentUser, setCurrentUser, user, setAccessToken }) => {
    const [hasEntered, setHasEntered] = useState(false);
    const [wantsNewChat, setWantsNewChat] = useState(false);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredChats, setFilteredChats] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [enteredChatWith, setHasEnteredChatWith] = useState([]);
    const [message, setMessage] = useState('');
    const [userChats, setUserChats] = useState([]);
    const [currentChat, setCurrentChat] = useState();
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://chatappserver-duricicsolutions.b4a.run/getusers', {
                credentials: 'same-origin', headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Access-Control-Allow-Origin': 'true'
                }
            });
            const data = await response.json();
            setUsers(data.sort((a,b) => a.fullName > b.fullName ? 1 : a.fullname < b.fullName ? - 1 : 0));

        } catch (err) {
        }

    }

    useEffect(() => {
        if (accessToken.length < 1) {
            navigate('/', { replace: true })
            setCurrentUser('');
        } else {
            if (user) fetchUsers();
        }
    }, [accessToken])

    useEffect(() => {
        if (users.length > 0) {getAllChats();
        users.filter(user => user.username !== currentUser);
        setFilteredContacts(users.sort((a,b) => a.fullName.split(' ')[0] > b.fullName.split(' ')[0] ? 1 : a.fullName.split(' ')[0] < b.fullName.split(' ')[0] ? -1 : 0))};
    }, [users, accessToken])

    const handleFilteredChats = () => {
        let filteredUsernames = users.filter(user => (user.username !== currentUser) &&
            (user.fullName.toLowerCase().includes(search.toLowerCase()))).map(user => user.username);
        setFilteredChats(userChats.filter(chat => filteredUsernames.includes(chat.user1) || filteredUsernames.includes(chat.user2)))
    }
    useEffect(() => {

        if (search.length > 0) {
           users.sort((a, b) => a.fullName > b.fullName ? 1 : a.fullName < b.fullName ? -1 : 0);
           setFilteredContacts(users.filter(user => user.username !== currentUser && user.fullName.toLowerCase().includes(search.toLowerCase())));
           handleFilteredChats();
        } else if (search.length === 0) {
            setFilteredContacts(users.filter(user => user.username !== currentUser));
            setFilteredChats(userChats);
        }
        }, [search])

    useEffect(() => {
        getAllChats();
    }, [hasEntered])

    const enteredChat = (user) => {
        setHasEntered(true);
        setHasEnteredChatWith(user);
        const foundChat = userChats.find(chat => (chat.user1 === user.username) || chat.user2 === user.username);
        console.log(foundChat);
        if (foundChat === undefined) setCurrentChat([]);
        else setCurrentChat(foundChat['chat'])
    }

    const sendMessage = async () => {
        const chatConfig = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Access-Control-Allow-': 'true'
            },
            body: JSON.stringify({
                sender: currentUser,
                receiver: enteredChatWith.username,
                message: message
            }),
            credentials: 'same-origin'
        }
        try {
            const response = await fetch('https://chatappserver-duricicsolutions.b4a.run/chat', chatConfig);
            const results = await response.json();
            console.log('results', results);
            setMessage('');
            getAllChats();
            setCurrentChat(results['chat'])
        } catch (err) {
        }

    }

    const getAllChats = async () => {
        const chatConfig = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Access-Control-Allow-Origin': 'true'
            },
            body: JSON.stringify({ sender: currentUser }),
            credentials: 'same-origin'
        }
        try {
            const response = await fetch('https://chatappserver-duricicsolutions.b4a.run/chat/getall', chatConfig);
            const data = await response.json();
            console.log(data);
            setUserChats(data);
            setFilteredChats(data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleRefresh = async () => {
        try {
            const response = await fetch('https://chatappserver-duricicsolutions.b4a.run/refresh', {
                headers: {
                    'Access-Control-Allow-Origin': 'true'
                }, credentials: 'include'
            });
            const data = await response.json();
            console.log(data);
            setAccessToken(data['jwt']);
        } catch (err) {
            console.log(err.message);
        }


    }

    const handleLogout = async () => {
        const response = await fetch('https://chatappserver-duricicsolutions.b4a.run/logout');
        console.log(response.status);
        setAccessToken('');
    }

    return (
        !hasEntered ?
            <main className='chatsContainer'> {/* Chats list window */}
                <div className='controlsBar'>
                    {wantsNewChat ? <BiArrowBack className='backBtn' onClick={() => setWantsNewChat(false)} /> : null}
                    <input
                        type='text'
                        className='searchInput'
                        placeholder='Search Chat'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} //null will be changed later to setChats
                    />
                    <h3 style={{width:'90%', padding:'3px', textAlign:'left', marginLeft:'20px'}}>Active</h3>
                    <ul className='activeList'>
                        {users.map(user => 
                            <li className='activeUser' style={{textAlign:'center'}}>
                            <img  className='contactImage' src={''} style={{margin:'5px'}} />
                            <label className='nameLabel' style={{fontSize:'12px', textAlign:'center', padding:'0'}}>{user.fullName.split(' ')[0] }</label>
                            </li>
                            )}
                        
                    </ul>
                </div>


                <div className='chatsList'>
                    {wantsNewChat ? filteredContacts.length > 0 && filteredContacts.map(contact =>
                        <div key={contact.username} style={{display:'flex',alignItems:'center'}}  className='chatItem' onClick={() => enteredChat(users.find(user => user.username === contact.username))}>
                            <img  className='contactImage' src={'./Visa.png'} />
                            <label className='nameLabel'>{contact.fullName}</label>
                        </div>) : 
                        filteredChats.length > 0 && filteredChats.map(chat => 
                            <div key={chat.user1 === currentUser ? chat.user2 : chat.user1} className='chatItem' onClick={()=> enteredChat(users.find(user => user.username === (chat.user1 === currentUser ? chat.user2 : chat.user1)))}>
                                <img  className='contactImage' src={'./Visa.png'} />
                                <label className='nameLabel'>{users.find(user => user.username === (chat.user1 === currentUser ? chat.user2 : chat.user1)).fullName}</label>
                                <label className='messageLabel'>{chat.chat[chat.chat.length-1].content}</label>
                                </div>
                            )
                        }
                </div>


                <div className='buttonsBar'>
                    <div className='btnContainer'>
                        <BsFillChatDotsFill className='chatsBtn' />
                        <label className='buttonLabel'>Chat</label>
                    </div>
                    <div className='btnContainer'>
                        <IoCallOutline className='callBtn' />
                        <label className='buttonLabel'>Call</label>
                    </div>
                    <IoAddOutline className='newChatBtn' onClick={() => setWantsNewChat(true)} />
                    <div className='btnContainer'>
                        <AiOutlinePicture className='galleryBtn' />
                        <label className='buttonLabel'>Gallery</label>
                    </div>
                    <div className='btnContainer'>
                        <RiUserSmileLine className='profileBtn' />
                        <label className='buttonLabel'>Profile</label>
                    </div>
                </div>

            </main> :
            <ChatWindow setHasEntered={setHasEntered}
                enteredChatWith={enteredChatWith}
                currentChat={currentChat}
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
                currentUser={currentUser}
                setWantsNewChat={setWantsNewChat}
                setUserChats={setUserChats} />

    )
}

export default Chat
