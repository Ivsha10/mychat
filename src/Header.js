import { Link } from 'react-router-dom'
import { IoMdArrowDropdownCircle } from 'react-icons/io'
import { useState, useEffect } from 'react'
const Header = ({accessToken, setAccessToken}) => {

    const [isActive, setIsActive] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    window.addEventListener('resize', () => { setWidth(window.innerWidth) });

    useEffect(() => {
        width < 700 ? setIsActive(true) : setIsActive(false)
    }, [])
    
    return (
        accessToken.length < 1 &&
        <ul className="navbar">
            <li > 
               <Link id='home' className='navbarItem'  to = {'/'}>Home</Link>  <label style={{display: width > 700 ? 'none' : 'block'}} onClick={()=> setIsActive(!isActive)}><IoMdArrowDropdownCircle className='.drop'/></label> 
            </li>
            <Link className='navbarItem' to={'/login'} style={{
                display: (width < 700 && isActive) ? 'none' : 'block',
                visibility: (width < 700 && isActive) ? 'hidden' : 'unset'
            }}
            >Log In</Link>
            <Link className='navbarItem' style={{
                display: (width < 700 && isActive) ? 'none' : 'block',
                visibility: (width < 700 && isActive) ? 'hidden' : 'unset'
            }}
                to={'/signup'}>Sign Up</Link>
        </ul>
    )
}

export default Header
