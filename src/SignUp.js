const SignUp = () => {
    return (
       <form>
            <label className="title"> Sign Up </label> <br/>
            <input type="text" required placeholder="Username"/>
            <input type="text" required placeholder="Password"/>
            <button role="submit">Sign Up</button>
       </form>
    )
}

export default SignUp
