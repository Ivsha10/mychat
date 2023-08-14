import './chat.css'

import { BiArrowBack } from 'react-icons/bi'
import {BiLogOut} from 'react-icons/bi';
import { RiChatNewLine } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ChatWindow from './ChatWindow'

const Chat = ({ accessToken, currentUser, setCurrentUser, user, setAccessToken }) => {
    const [hasEntered, setHasEntered] = useState(false);
    const [wantsNewChat, setWantsNewChat] = useState(false);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [searchedResults, setSearchedResults] = useState([]);
    const [enteredChatWith, setHasEnteredChatWith] = useState();
    const [message, setMessage] = useState('');
    const [userChats, setUserChats] = useState();
    const [currentChat, setCurrentChat] = useState();
    const navigate = useNavigate();
                
    const fetchUsers = async () =>{
        try {
            const response = await fetch('https://10.0.18.142:3500/getusers', {credentials: 'same-origin', headers: {
                'Authorization' : `Bearer ${accessToken}`,
                'Access-Control-Allow-Credentials': true
            }});
            const data = await response.json();
            setUsers(data);
        
        } catch (err) {
        }
        
    }
    useEffect(() => {
        if (accessToken.length < 1) {
            navigate('/', { replace: true })
            setCurrentUser('');
        } else {
           if(user) fetchUsers();
        }
    }, [accessToken])

    useEffect(()=> {
       if(users) getAllChats();
    },[users, accessToken])


    useEffect(()=>{
        if(search.length > 0)
        setSearchedResults(users.filter(user => user.fullName.toLowerCase().includes(search.toLowerCase()) && user.username !== currentUser))
        else {setSearchedResults([])};
    },[search])
    
    useEffect(()=> {
        if(!wantsNewChat) {
            setSearch('');
            setSearchedResults('');
        };
    })

   

    useEffect(()=>{
        getAllChats();
    }, [hasEntered])
    
    const enteredChat = (user)=> {
        setHasEntered(true);
        setHasEnteredChatWith(user);
        const foundChat = userChats.find(chat => (chat.user1 === user.username) || chat.user2 === user.username);
        console.log(foundChat);
        if(foundChat === undefined) setCurrentChat([]);
        else setCurrentChat(foundChat['chat'])
    }


    
    
    const sendMessage = async ()=> {
        const chatConfig = {
            method: 'POST', 
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`,
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify({sender: currentUser,
                receiver: enteredChatWith.username,
                message: message
            }),
            credentials: 'same-origin'
        }
        try {
            const response = await fetch('https://10.0.18.142:3500/chat', chatConfig);
            const results = await response.json();
            console.log('results',results);
            setMessage('');
            getAllChats();
            setCurrentChat(results['chat'])
        } catch (err) {
        }

    }
    const getAllChats = async ()=> {
        const chatConfig = {
            method: 'POST', 
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`,
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({sender: currentUser}),
            credentials: 'same-origin'
        }
        try {
            const response = await fetch('https://10.0.18.142:3500/chat/getall', chatConfig);
            const data = await response.json();
            console.log(data);
            setUserChats(data);
        } catch (err) {
        }
    }

    const handleRefresh = async ()=> {
        try {
            const response = await fetch('https://10.0.18.142:3500/refresh',{headers:{
                'Access-Control-Allow-Credentials':true
            }, credentials: 'include'});
            const data = await response.json();
            console.log(data);
            setAccessToken(data['jwt']);
        } catch (err) {
            console.log(err.message);
        }
        
        
    }
    const handleLogout = async ()=>{
        const response = await fetch('https://10.0.18.142:3500/logout');
        console.log(response.status);
        setAccessToken('');
    }
    

   
    return (
        !hasEntered ?
            <main className='chatsContainer'> {/* Chats list window */}
                <BiLogOut className='exitBtn' onClick={()=> handleLogout()}/>
                <div className='controlsBar'>
                    {wantsNewChat ? <BiArrowBack className='backBtn' onClick={() => setWantsNewChat(false)} /> :null}
                    <input
                        type='text'
                        className='searchInput'
                        placeholder='Search Chat'
                        value={search}
                        onChange={(e)=> wantsNewChat ? setSearch(e.target.value) : null} //null will be changed later to setChats
                    />
                    {!wantsNewChat &&
                        <RiChatNewLine className='newChatBtn' onClick={() => setWantsNewChat(true)} />
                    }
                </div>

                <h2> {wantsNewChat ? 'Contacts' : 'Chats'} </h2>

                {!wantsNewChat && userChats &&
                userChats.map(chat => 
                    <div className='chatItem' onClick={() => enteredChat(users.find(user => user.username === (chat.user1 !== currentUser ? chat.user1 : chat.user2) ))}>
                    <label style={{ width: '100%', textAlign: 'left', paddingBottom: '2px', paddingLeft: '20px' }}>{chat.user1 !== currentUser ? users.find(user => user.username === chat.user1).fullName 
                    : users.find(user => user.username === chat.user2).fullName}</label>
                    <label style={{ width: 'max-content', textAlign: 'left', paddingLeft: '40px', paddingTop: '0px' }}>{chat.chat[chat.chat.length - 1].content}</label>
                </div>
                    )}

                {wantsNewChat &&
                    <div>
                        {searchedResults.length > 0 && searchedResults.map(result => 
                            <div key={result.username} className='chatItem' onClick={() => {enteredChat(result); console.log(result)}}>
                            <label style={{ width: '50%', textAlign: 'left', paddingBottom: '2px', paddingLeft: '20px' }}>{result.fullName}</label>
                        </div> )}
                    </div>}
            </main> : 
            <ChatWindow setHasEntered={setHasEntered} 
                        enteredChatWith={enteredChatWith}
                        currentChat={currentChat}
                        message={message}
                        setMessage={setMessage}
                        sendMessage={sendMessage}
                        currentUser={currentUser}
                        setWantsNewChat={setWantsNewChat}
                        setUserChats= {setUserChats}/>
            
    )
}

export default Chat
