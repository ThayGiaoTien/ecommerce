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
        //get infor from database and setlogged, admin, cart
        if(token){
            const getUser= async()=>{
                try{
                    const res= await axios.get('/user/infor', {headers:{Authorization:token}})  
                    setIsLogged(true)
                    
                    res.data.user.role===1 ? setIsAdmin(true): setIsAdmin(false)
                    setCart(res.data.user.cart) //look at the data
                } catch(err){
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    },[token])
    
    //create a function addCart to patch to database when a product has been added to cart.
    //if product has been checked(item._id!==product._id) then setCart, quantity =1  and patch to server
    const addCart=async(product)=>{  //tp change quantity to
        if(!isLogged) return alert('Please login to continue buying!')
        const check= cart.every(item=>{
            return item._id!== product._id
        })
        if(check){
            setCart([...cart, {...product, quantity: 1}])
            //i think these lines below are doesn't make sense
            await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity:1}]},
            {headers: {Authorization: token}
        })
            
        } else{
            alert("This product has been added to cart!")
        }   
    }
    return {
        isLogged:[isLogged, setIsLogged],
        isAdmin:[isAdmin,setIsAdmin],
        cart:[cart, setCart],
        addCart:addCart,
        history:[history, setHistory]
    }
    

}

export default UserAPI