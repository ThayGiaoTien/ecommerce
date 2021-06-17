import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


function Login(){
    //crate state of user, when input changes,setUser
    //when form was submitted , await dispatching it to database,
    //then save it to localStorage by calling localStorage.setItem('firstLogin", true)
    //redirect to homepage by window.location.href="/"
    //if throw error, alert it to screen
    const [user, setUser]= useState({
        email: "",
        password: ""
    })
    const onChangeInput=(e)=>{
        const {name, value}=e.target;
        // console.log(e.target)
        setUser({...user, [name]: value}) // exp: setUser(...user, email: e.target.value)
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            await axios.post('/user/login', {...user})
            localStorage.setItem('firstLogin', true)
            window.location.href="/"
        } catch(err){
            alert(err.response.data.msg)
        }

    }   
    
    return (
        <div className="login-page">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input type="text" required name="email" placeholder="Email"
                value={user.email} onChange={onChangeInput}/>
                <input type="password" required name="password" placeholder="Password"
                value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit" >Login</button>
                    <Link to="/register">Register</Link>
                </div>
            </form>
            
        </div>
    )
}

export default Login
