import React, {useContext, useState } from 'react'
import {GlobalState} from "../../../GlobalState"
import ProductItem from "../utils/productItem/ProductItem"
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'


// We need to add some feature for admin like delete, edit, check, check all, delete all 
const Products = () => {
    const state= useContext(GlobalState)
    const [products, setProducts]= state.productsAPI.products //each child in list should have a unique {key}
    const [isAdmin]= state.userAPI.isAdmin
    const [token]= state.token
    const [callback, setCallback]= state.productsAPI.callback
    const [isCheck, setIsCheck]= useState(false)
    const [loading, setLoading]= useState(false)

    // Change state of check of products
    const handleCheck=(id)=>{
        products.forEach(product=>{
            if(product._id===id) {
                product.checked=!product.checked
            }
        })
        setProducts([...products])
    }

    // Delete product and destroy images on cloudinary by public_id
    const deleteProduct=async(id, public_id)=>{
        try{
            if(window.confirm('Are you sure about that?')){
                setLoading(true)
                await axios.post('api/destroy', {public_id}, {
                    headers:{Authorization: token}
                }) 
                await axios.delete(`/api/products/${id}`, {
                    headers:{Authorization: token}
                })
                setCallback(!callback)
                setLoading(false)
            }
            
        } catch(err){
            console.log(err.response.data.msg)
        }

    }
    //Check All and Delete all(use isCheck state)
    const checkAll=()=>{
        products.forEach(product=>{
            product.checked= !isCheck
        })
        setIsCheck(!isCheck)
        setProducts([...products])
    }
    const deleteAll=()=>{
        if(window.confirm('Are you sure about that?')){
            products.forEach(product=>{
                if(product.checked) {
                    deleteProduct(product._id, product.images.public_id)
                }
            })
        }
        
    }
    if(loading) return <div><Loading /></div>
    return (
        <>
            <Filters/>
            {isAdmin &&
                <div className='delete-all'>
                    <span>Select all</span>   
                    <input type='checkbox' checked={isCheck} onChange={checkAll}/>
                    <button onSubmit={deleteAll}>Delete All</button>
                </div>
            }
            <div className= "products">
            { 
                products.map(product=>{
                    return (
                        <ProductItem  key={product._id} product={product} 
                        deleteProduct={deleteProduct} isAdmin={isAdmin}
                        handleCheck={handleCheck}/>
                        //    Keys help React identify which items have changed, 
                        //    are added, or are removed. Keys should be given to the 
                        //    elements inside the array to give the elements a stable
                        //    identity
                    )
                })
            }
            </div>
            <LoadMore />
            {
                products.length===0 && <Loading />
            }
           
        </>
    )
}

export default Products
