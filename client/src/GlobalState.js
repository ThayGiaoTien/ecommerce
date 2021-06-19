import React, {createContext, useState, useEffect }from 'react'
import UserAPI from './api/UserAPI'
import ProductsAPI from './api/ProductsAPI'
import CategoriesAPI from './api/CategoriesAPI'
import axios from 'axios'

//export 2 functions: GlobalState and DataProvider
export const GlobalState= createContext()


export const DataProvider=({children})=>{
    //Create state to store value data
    //Return the state value via GlobalState.Provider to {children}
    const [token, setToken]= useState(false)
    //Now we get firstLogin from localStorage, refresh token, setToken to accesstoken
    
    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken = async () =>{
                const res = await axios.get('/user/refresh_token')
                
                setToken(res.data.accesstoken)
                
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    },[])
  
    const state={
        token: [token, setToken],
        productsAPI: ProductsAPI(),  // return: products: [products, setProducts]
        userAPI: UserAPI(token), 
        categoriesAPI: CategoriesAPI()
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
 