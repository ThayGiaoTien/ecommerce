import React, {useState} from 'react' 
import {Link} from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    //create state of form, when form is submitted , sent req to database
    //then redirect to login
    const [user, setUser]= useState({
        name: "", 
        email: "", 
        password: ""
    })
    const onChangeInput=(e)=>{
        const {name, value}= e.target;
        setUser({...user, [name]: value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{ 
            await axios.post('/user/register', {...user})
            localStorage.setItem('firstLogin', true)
            window.location.href= '/'

        } catch(err){
            alert(err.response.data.msg)
        }
    }
    return (
        <div className='register-page'>
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input type='text' required name='name' placeholder='Name'
                value={user.name} onChange={onChangeInput} />
                <input type='text' required name='email' placeholder='Input Email'
                value={user.email} onChange={onChangeInput} />
                <input type='password' required name='password' placeholder='Input password'
                value={user.password} onChange= {onChangeInput} />

                <div className='row'>
                    <button type='submit'> Register</button>
                    <Link to='/login'>Already has account? Click to login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register
