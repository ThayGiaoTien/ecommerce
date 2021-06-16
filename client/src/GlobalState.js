import React, {createContext, useState, useEffect }from 'react'
import ProductsAPI from './api/ProductsAPI'

//export 2 functions: GlobalState and DataProvider
export const GlobalState= createContext()


export const DataProvider=({children})=>{
    //Create state to store value data
    //Return the state value via GlobalState.Provider to {children}
    const [token, setToken]= useState(false)

    const state={
        token: [token,setToken],
        productsAPI: ProductsAPI()  // return: products: [products, setProducts]
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
 