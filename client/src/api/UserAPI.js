//create a function named UserAPI to get data from database to change state of login, admin, cart, history
//if(token) create function to getUser from database/
//change isloged =true, if role=1 change isAdmin=true, setCart= res.data.cart

import axios from "axios";
import {useState, useEffect} from "react"

function UserAPI(token){
    const [isLogged, setIsLogged]= useState(false)
    const [isAdmin, setIsAdmin]= useState(false)
    const [cart, setCart]= useState([])
    const [history, setHistory]= useState([])
    useEffect(()=>{
        if(token){
            const getUser= async()=>{
                try{
                    const res= await axios.get('/user/infor', {
                        headers:{Authorization: token}
                    })
                    setIsLogged(true)
                    if(res.data.role===1) setIsAdmin(true)
                    setCart(res.data.cart)
            
                } catch(err){
                    alert(err.response.data.msg)
                }
            }
        }
    },[token])
    return {
        isLogged:[isLogged, setIsLogged],
        isAdmin:[isAdmin,setIsAdmin],
        cart:[cart, setCart],
        history:[history, setHistory]
    }
    

}

export default UserAPI