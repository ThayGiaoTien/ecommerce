import React, {useContext, useState, useEffect} from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from "axios"
import PaypalButton from './PaypalButton'

const Cart = () => {
    const state=useContext(GlobalState)
    const [cart, setCart]= state.userAPI.cart
    const [token]= state.token
    const [total, setTotal]= useState()
    //useEffect to change total of order
    // const addToCart=async(cart)=>{
    //     await axios.patch('user/addCart', {cart}, {headers:{Authorization: token}})
    // }
    useEffect(()=>{
        const getTotal=()=>{
            
            const total = cart.reduce((prev, item) => {

                return prev + (item.price * item.quantity)
            },0)
            setTotal(total)
        }  
        getTotal()
    },[cart])

    const addToCart = async (cart) =>{ // to increase or decrease quantity
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }

    const increment=(id)=>{
        cart.forEach(item=>{
            if(item._id===id){
                item.quantity+=1
            }
        })
        setCart([...cart] )
        addToCart(cart)
    }
    const decrement=(id)=>{
        cart.forEach(item=>{
            if(item._id===id){
                item.quantity=1?item.quantity=1: item.quantity-=1
            }
        })
        setCart([...cart] )
        addToCart(cart)
    }
    const removeProduct=(id)=>{
        if(window.confirm("Do you want to delete this product!")){
            cart.forEach((item, index)=>{               
                if(item._id===id){
                    cart.splice(index,1)
                }
            
            })
            setCart([...cart] )
            addToCart(cart)
        }
    }
    const tranSuccess= ()=>{

    }
    
    return (
        <div>
            {
                cart.map(product=>(
                    <div className='detail cart' key={product._id}>
                        <img src={product.images.url} alt=''/>

                        <div className='box-detail'>
                            <h2>{product.title}</h2>
                            <h3>{product.price*product.quantity}</h3>
                            <p>{product.description}</p>
                            <p>{product.content}</p>

                            <div className='amount'>
                                <button onClick={()=>decrement(product._id)}>-</button>
                                <span>{product.quantity}</span>
                                <button onClick={()=>increment(product._id)}>+</button>
                            </div>
                        </div>
                        <div className="delete" 
                            onClick={() => removeProduct(product._id)}>
                                X
                        </div>
                    </div>    
                ))
            }
            <div className='total'>
                <h3>Total: $ {total}</h3>
            </div>
        </div>
    )
}

export default Cart
