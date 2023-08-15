import './credentials.css';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
const LogIn = ({accessToken, setAccessToken, setCurrentUser, setUser}) => {
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();       
            try {
                const config = {
                    method: 'POST', 
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'Access-Control-Allow-Origin': 'true'
                    },
                    body: JSON.stringify({username: username, pwd: pwd}),
                    credentials: 'include'
                }
<<<<<<< HEAD
                const response = await fetch('https://chatappserver-duricicsolutions.b4a.run/login', config);
=======
                const response = await fetch('https://chatappserver-duricicsolutions.b4a.run:3500/login', config);
                console.log(response);
>>>>>>> 39ced44d47f28a43756b8fe3a38950c5890d4cc1
                const data = await response.json();
                if(data.accessToken) {
                    setAccessToken(data.accessToken);
                    setMessage(data.message);
                    setCurrentUser(username);
                    console.log(data.username);
                    setUsername('');
                    setPwd('');
                    setUser(data.user);
                    console.log(data.user);
                } else {
                    setMessage(data.error);
                }
            } catch (err) {    

            }
    } 

    useEffect(()=> {
        if(accessToken.length > 0)
        {
            setTimeout(()=> {
                navigate('/chat', {replace: true})
            }, 750)
        }
        
    }, [accessToken])
    return (
       <form onSubmit={(e)=> {
        handleSubmit(e);
       }}>
            <label className="title"> Log In </label> <br/>
            <input type="text" required placeholder="Username" 
            value={username} 
            onChange={(e)=>setUsername(e.target.value)}/>
            <input type="password" required placeholder="Password" 
            value={pwd}
            onChange={(e)=> setPwd(e.target.value)}/>
            <button role="submit">Log In</button>
            <label className='title'>{message} </label>
    </form>
    )
}

export default LogIn
