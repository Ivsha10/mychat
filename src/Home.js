import './home.css';

import { useEffect } from "react";
import { useState } from "react"
import { FcNext, FcPrevious } from 'react-icons/fc'
const Home = () => {
    let content = [
        'Join in a Snap:  Sign up swiftly or log in seamlessly with your existing credentials. ConnectX ensures a hassle-free onboarding experience, so you can get chatting without delay.',
        'Discover Vibrant Chat Rooms: Uncover a vibrant array of chat rooms, tailored to your interests and passions. Dive into lively discussions or create your very own chat room to connect with a like-minded community.',
        "Stay Organized and Focused: Keep your chats organized with ConnectX's intuitive features. Pin important messages, categorize conversations, and set reminders to follow up on critical discussions.",
        'Security at its Core: Your privacy is paramount. ConnectX ensures end-to-end encryption, keeping your conversations secure and confidential.',
        "Stay Connected on the Go: Whether you're on your desktop, tablet, or smartphone, ConnectX ensures a seamless cross-device experience. Your conversations are always within reach.",
        'A World of Languages: ConnectX breaks language barriers, offering multilingual support that enables seamless conversations with friends from all around the globe.',
        "Customize Your Profile: Showcase your personality with a unique profile. Add avatars, bios, and personalize your space to make meaningful connections with others.",
        "Stay Updated in Real Time: Never miss a beat with real-time notifications. Stay on top of new messages, mentions, and exciting chat room activities."
    ]
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState('');
    const [isNext, setIsNext] = useState(false);
    const handleNext = () => {
        if (count < content.length - 1) setCount(count + 1);
        setIsNext(true);
    }
    const handlePrev = () => {
        if (count > 0) {
            setCount(count - 1);
            setIsNext(false);
        }
    }

    useEffect(() => {
        setMessage(content[count]);
        let elem = document.getElementById(count);
        elem.style.color = '#127bde';
        isNext ? document.getElementById((count - 1).toString()).style.color = 'white' : document.getElementById((count + 1).toString()).style.color = 'aliceblue'
    }, [count])
    return (
        <div style={{ display: 'flex', justifyContent:'center' }}>
            <FcPrevious className='navBtn' onClick={() => handlePrev()} />
            <p>
                {message}
                <ul className='dotList'>
                    {content.map(msg => <li className='dot' id={  content.indexOf(msg).toString()} >.</li>)}
                </ul>
            </p>
            <FcNext className='navBtn' onClick={() => { handleNext(); }} />
        </div>

    )
}

export default Home
