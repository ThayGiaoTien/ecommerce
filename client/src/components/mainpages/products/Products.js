import React, {useContext, useState } from 'react'
import {GlobalState} from "../../../GlobalState"
import ProductItem from "../utils/productItem/ProductItem"


const Products = () => {
    const state= useContext(GlobalState)
    const [products]= state.productsAPI.products //each child in list should have a unique {key}
    console.log(products)

    return (
        <div className= "products">
           { 
               products.map(product=>{
                   return (
                       <ProductItem  key={product._id} product={product}/>
                    //    Keys help React identify which items have changed, 
                    //    are added, or are removed. Keys should be given to the 
                    //    elements inside the array to give the elements a stable
                    //    identity
                   )
               })
           }
        </div>
    )
}

export default Products
