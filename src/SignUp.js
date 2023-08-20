import './credentials.css';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
const SignUp = () => {
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isHidden, setIsHidden] = useState(true);
    const [errorText, setErrorText] = useState([]);
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [message, setMessage] = useState('');
    const [imageBase, setImageBase] = useState('')

    const reader = new FileReader();

    reader.addEventListener('load', () => {
        setImageBase(reader.result);
    })

    useEffect(()=>{
        console.log(imageBase)
    },[imageBase])
           

    const  handleSubmit =  async (e)=>{
        e.preventDefault();
        let usrExp = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$");
        let pwdExp = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
        let phoneExp = new RegExp("^\\+[1-9]{1}[0-9]{0,2}[2-9]{1}[0-9]{1}[0-9]{3}[0-9]{3,4}$")
        let fullNameExp = /^([\w]{3,})+\s+([\w\s]{3,})+$/i;
        if(usrExp.test(username) && pwdExp.test(pwd) && phoneExp.test(phoneNumber) && fullNameExp.test(fullName) ) {
          
            try {
                const config = {
                    method: 'POST', 
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({username:username, pwd:pwd, fullName: fullName, phoneNumber:phoneNumber, imageBase: imageBase})
                }

                const response = await fetch('https://chatappserver-duricicsolutions.b4a.run/signup', config);
                const data = await response.json();
                if(data.message) {
                    setUsername('');
                    setPwd('');
                    setMessage(data.message)
                    setIsSignedUp(true);
                } else {
                    setMessage(data.error)
                }                
            } catch (err) {
                console.log(err.message);
            }
           
        } else if(usrExp.test(username) === false) {
           setIsHidden(false);
           setErrorText(['username', '6','']);
        }
        else if(usrExp.test(pwd) === false) {
            setIsHidden(false);
            setErrorText(['password', '8', 'One Special character']);
         } else if (phoneExp.test(phoneNumber)===false) {console.log(phoneNumber)}
         else if(fullNameExp.test(fullName)===false) {console.log(fullName)}


         
    }
    return (
        !isSignedUp ? 
       <form onSubmit={  (e)=>  handleSubmit(e)}>
            <label className="title"> Sign Up </label> <br/>
            <input type="text" required placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input type="password" required placeholder="Password" value={pwd} onChange={(e)=>setPwd(e.target.value)}/>
            <input type="text" required placeholder="Full Name" value={fullName} onChange={(e)=> setFullName(e.target.value)}/>
            <input type="text" required placeholder="Phone Number" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
            <input type='file' id='fileInput' onChange={(e)=> {
                const file = e.target.files[0];
               reader.readAsDataURL(file);
             }}/>
            <button role="submit">Sign Up</button>
            <ul className='errorList' style={{listStyle:'circle', listStyleType:'initial',
             display: isHidden ? 'none' : 'block',
             visibility: isHidden ? 'hidden' : 'unset' }}>
                <li className='errorItem' style={{paddingLeft:'5px'}}> The {errorText[0]} must contain at least:  </li>
                <li className='errorItem'>  {errorText[1]} characters </li>
                <li className='errorItem'> One uppercase letter </li>
                <li className='errorItem'> One lowercase letter </li>
                <li className='errorItem'> One digit </li>
                <li className='errorItem'> {errorText[2]} </li>
            </ul>
       </form> :
       <div>
              <label className='title'>You have Signed Up successfully! <Link className='navbarItem' style={{width:'60%', paddingLeft:'10px', marginTop:'20px'}} to={'/login'}>Log In</Link> </label>
       </div> 
     
    )
}

export default SignUp
