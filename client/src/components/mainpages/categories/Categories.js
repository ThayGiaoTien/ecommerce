import React, {useState, useEffect, useContext} from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'

const Categories = () => {
    const [category, setCategory]= useState('')
    const state= useContext(GlobalState)
    const [token]= state.token //if don't  put token in [], there will err
    //this because GlobalState will return data as array,
    const [categories]= state.categoriesAPI.categories 
    const [callback, setCallback]= state.categoriesAPI.callback
    const [onEdit, setOnEdit]= useState(false)
    const [id, setId]= useState('')
    console.log(categories)

    //create category with 2 case : onEdit & create new
    //when admin edit category, setOnEdit = true and call editCategory(())
    //after Changed, reset state and change state of callback
    const createCategory= async(e)=>{
        e.preventDefault()
        try{
            if(onEdit) { //editCategory() provides 2 props category._id and category.name
                const res= await axios.put(`/api/category/${id}`, {name: category},
                {headers:{Authorization: token}})
                alert(res.data.msg)
            } else {
                const res= await axios.post('api/category', {name: category},{ //category= e.target.value
                    headers:{Authorization: token}
                })
                alert(res.data.msg)
            }
            setOnEdit(false)
            setCategory('')
            setCallback(!callback)
            

        } catch(err){
            alert(err.response.data.msg)
        }
    }
    //edit and delete
    const editCategory=async(id, name)=>{
        setId(id)
        setCategory(name)
        setOnEdit(true)
    }
    const deleteCategory=async(id)=>{
        try{
            const res= await axios.delete(`/api/category/${id}`, {headers:{
                Authorization: token
            }})
            setCallback(!callback)
            alert(res.data.msg)
        } catch(err){
            alert(err.response.data.msg)
        }


    }
    return (
        <div className="categories">
            <form onSubmit={createCategory}>
                <label htmlFor='category'>Category</label>
                <input type='text' name='category' value={category} required
                onChange={e=>setCategory(e.target.value)}/>
                <button type='submit'>{onEdit?"Update":"Create"}</button>
            </form>

            <div className='col'>
                {
                    categories.map(category => (
                        <div className="row" key={category._id}>
                            <p>{category.name}</p>
                            <div>
                                <button onClick={() => editCategory(category._id, category.name)}>Edit</button>
                                <button onClick={() => deleteCategory(category._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>  
    )
}

export default Categories
