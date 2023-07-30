const LogIn = () => {
    return (
       <form>
            <label className="title"> Log In </label> <br/>
            <input type="text" required placeholder="Username"/>
            <input type="text" required placeholder="Password"/>
            <button role="submit">Log In</button>
       </form>
    )
}

export default LogIn
