import { BiArrowBack } from 'react-icons/bi'
import { RiChatNewLine } from 'react-icons/ri'
const ChatList = ({wantsNewChat, setWantsNewChat, search, setSearch, userChats, users, searchedResults, enteredChat, currentUser}) => {
    //THIS DOESNT WORK! NEEDS FIXING
    return (
        <main className='chatsContainer'> {/* Chats list window */}
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
            <label style={{ width: '50%', textAlign: 'left', paddingBottom: '2px', paddingLeft: '20px' }}>{chat.user1 !== currentUser ? users.find(user => user.username === chat.user1).fullName 
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

    </main>
    )
}

export default ChatList
