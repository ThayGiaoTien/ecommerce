
import React from 'react'
import {GlobalState} from "../../GlobalState"
import {Link} from "react-router-dom"
import Menu from "./icon/menu.svg"
import Close from "./icon/close.svg"
import Cart from "./icon/cart.svg"
import axios from "axios"

const Header = () => {
    return (
        <header>    
            <div className="menu" >
                <img src={Menu} alt= "" width= "30"/>
            </div>
            <div className="logo">
                <h1>
                    <Link to="/">Teacher Forward</Link>
                </h1>
            </div>
            <ul>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/login">Login - Register</Link></li>
                
            </ul>
            <div className="cart-icon" >
                <span>0</span>
                <Link>
                    <img src={Cart} alt="" width="30"/>
                </Link>
                
            </div>
            
        </header>
    )
}

export default Header
