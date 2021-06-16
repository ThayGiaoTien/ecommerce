import {useState, useEffect} from 'react'
import axios from 'axios'

//Create a function named ProductsAPI
//create a state 
//create a function named getProducts to response products from database using axios
//call it in useEffect()
//return results

function ProductsAPI(){
    const [products, setProducts]= useState([])
    
    const getProducts= async()=>{
        const res= await axios.get('/api/products')
        
        setProducts(res.data.products)
    }
    useEffect(()=>{
        getProducts()
    },[])

    return {
        products: [products, setProducts]
    }
}

export default ProductsAPI

//Import this function to GlobalState