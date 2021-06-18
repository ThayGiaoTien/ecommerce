
import React, {useContext, useState} from 'react'
import {GlobalState} from "../../GlobalState"
import {Link} from "react-router-dom"
import Menu from "./icon/menu.svg"
import Close from "./icon/close.svg"
import Cart from "./icon/cart.svg"
import axios from "axios"

// When admin logged in, change to  admin router(create_product and category) and hide cart div
// when user logged in, change to user router(history, logout)
const Header = () => {
    const state= useContext(GlobalState)
    const [isLogged]= state.userAPI.isLogged
    const [isAdmin]= state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu]= useState(false)
    
    //create function to logout, change to admin/user route
    const logoutUser= async()=>{
        await axios.get('/user/logout')
        localStorage.removeItem('firstLogin')
        window.location.href= '/'
    }
    const adminRouter = ()=>{
        return (
            <>
                <li> <Link to='/create_product'>Create Products</Link></li>
                <li><Link to='/category'>Categories</Link></li>
            </>
        )
    }
    const userRouter=()=>{
        return (
            <>
                <li><Link to='/history'>History</Link></li>
                <li><Link to='/' onClick={logoutUser}>Log out</Link></li>
            </>
        )
    }
    const styleMenu = {
        left: menu ? 0 : "-100%"
    }
    return (
        <header>    
            <div className="menu" >
                <img src={Menu} alt= "" width= "30"/>
            </div>
            <div className="logo">
                <h1>
                    <Link to="/">{isAdmin?"Admin":"Teacher Forward"}</Link>
                </h1>
            </div>
            <ul style={styleMenu}>
                <li><Link to='/'>{isAdmin?'Products':'Shop'}</Link></li>
                {isAdmin && adminRouter()}
                {isLogged? userRouter(): <li><Link to='/login'>Login✥Register</Link></li>}

                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>
            </ul>
            {
                isAdmin?'':
                    <div className="cart-icon" >
                    <span>{cart.length}</span>
                    <Link to='/cart'>
                        <img src={Cart} alt="" width="30"/>
                    </Link>
                
            </div>
            }

            
            
        </header>
    )
}

export default Header
