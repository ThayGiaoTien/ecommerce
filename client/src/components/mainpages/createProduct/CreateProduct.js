import React, {useState, useEffect, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import Loading from '../utils/loading/Loading'
import { useHistory, useParams } from 'react-router-dom'

// we upload images via cloudinary, so we need to create two separate function 
//to upload images and sent form data to server
const initialState={
    product_id:'',
    title:'',
    price:0,
    description: 'This product has made in Vietnam with high quality',
    content: 'Welcome to my website. Here you can choose the best product with one click!',
    category:'',
    _id: ''
}
const CreatProduct = () => {
    const state= useContext(GlobalState)
    const [product, setProduct]= useState(initialState)
    const [categories]= state.categoriesAPI.categories
    
    const [images, setImages]= useState(false)
    const [loading, setLoading]= useState(false)

    const [isAdmin]= state.userAPI.isAdmin
    const [token]= state.token

    const history=useHistory()
    const param= useParams()

    const [products]= state.productsAPI.products
    const [onEdit, setOnEdit]= useState(false)
    const [callback, setCallback]= state.productsAPI.callback

    //useParams(product._id=params.id setOnEdit(true) to change state of each
    //product when a product is on edit
    useEffect(()=>{
        if(param.id){
            setOnEdit(true)
            products.forEach(product=>{
                if(product._id===param.id){
                    setProduct(product)
                    setImages(product.images)
                }
            })

        } else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    },[param.id, products])


    //handle upload: check image's type and size, store it in form and send 
    //to the server({'content-type':'multipart/form-data'})
    const handleUpload=async(e)=>{  
        e.preventDefault()
        try{
            if(!isAdmin) return alert('You are not an admin!')
            const file= e.target.files[0]
            if(!file) return alert("File not exists.")
            if(file.size>1024*1024) return alert("Size too large.")
            if(file.type!=='image/jpeg' &&file.type!=='image/png'){
                return alert("File format is incorrect.")
            } 
            let formData= new FormData()  //construct a pairs of key-value
            formData.append('file', file)
            setLoading(true)
            const res= await axios.post('/api/upload', formData, {
                headers:{'content-type':'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)
        } catch(err){
            return alert(err.response.data.msg)
        }
    }
    

    //handleDestroy: Destroy image file(admin)
    const handleDestroy=async()=>{   
        try{    
            if(!isAdmin) return alert("You are not an admin!")
            setLoading(true)
            const res= await axios.post('/api/destroy', {public_id: images.public_id},
            {headers:{Authorization: token}})
            setLoading(false)
            setImages(false)
        } catch(err){
            return alert(err.response.data.msg)
        }
    }
    //handleChangeInput
    const handleChangeInput=(e)=>{
        const {name, value}= e.target
        setProduct({...product, [name]: value})
    }
    //handleSubmit: post product and images to server
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            if(!isAdmin) return alert("You are not an admin!")
            if(!images) return alert("No images upload")
            if(onEdit){
                await axios.post(`/api/products/${product._id}`, {...product, images},
                {headers:{Authorization: token}})
            } else{
                await axios.post('/api/products', {...product, images}, {
                    headers:{Authorization:token}
                })
            }
            setCallback(!callback)
            history.push('/')
        } catch(err){
            return alert(err.response.data.msg)
        }

    }
    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div className='create_product'>
            <div className='upload'>
                <input type='file' name='file' id='file_up' 
                onChange={handleUpload} />
                {
                    loading? <div id="file_img"><Loading/></div>
                    :<div id='file_img' style={styleUpload}>
                        <img src={images?images.url:''} alt=''/>
                        <span onClick={handleDestroy}>X</span>
                    </div>    
                }
            </div>

            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <label htmlFor='product_id'>Product ID</label>
                    <input type='text' name='product_id' id='product_id' required
                    value={product.product_id} onChange={handleChangeInput} disabled= {onEdit}/>
                </div>
                <div className='row'>
                    <label htmlFor='title'>Title</label>
                    <input type='text' name='title' id='title' required
                    value={product.title} onChange={handleChangeInput} disabled= {onEdit}/>
                </div>
                <div className='row'>
                    <label htmlFor='price'>Price</label>
                    <input type='number' name='price' id='price' required
                    value={product.price} onChange={handleChangeInput} disabled= {onEdit}/>
                </div>
                <div className='row'>
                    <label htmlFor='description'>Description</label>
                    <input type='text' name='description' id='description' required
                    value={product.description} onChange={handleChangeInput} disabled= {onEdit}/>
                </div>
                <div className='row'>
                    <label htmlFor='content'>Content</label>
                    <input type='text' name='content' id='content' required
                    value={product.content} onChange={handleChangeInput} disabled= {onEdit}/>
                </div>
                <div className='row'>
                    <label htmlFor='categories' >Catagories: </label>
                    <select name='category' value={product.category} onChange={handleChangeInput}>
                        <option value=''>Please select a category</option>
                        {
                            categories.map(category=>(
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <button type="submit">{onEdit? "Update" : "Create"}</button>

                        
            </form>
            
        </div>
    )
}

export default CreatProduct
