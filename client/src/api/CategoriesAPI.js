import {useState, useEffect} from 'react'
import axios from 'axios'

// create api function to get categories from database and change callback state
const CategoriesAPI = () => {
    const [callback, setCallback]= useState(false)
    const [categories, setCategories]= useState([]) 
    //After each action with server, change state of callback to update display
    useEffect(()=>{
        const createCategory=async()=>{
            const res =await axios.get('/api/category')
            console.log(res.data)
            setCategories(res.data)
        }
        createCategory()
        
    },[callback])
    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default CategoriesAPI
