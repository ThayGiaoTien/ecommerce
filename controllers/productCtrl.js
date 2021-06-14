const Products= require('../models/productModel')

//Filter, sorting and paginating

const productCtrl={
    getProducts: async(req, res)=>{
        try{
            //Method: GET
            //use features API to modify data
            //call features.query 

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    createProduct: async(req, res)=>{
        try{
            //Method: POST
            //check images were uploaded, product does not exists then create with title =>lowercase
            const {product_id, title, price, description, content, images, category}= req.body;
            if(!images) return res.status(400).json({msg: "No image upload."})
            const productExists= await Products.findOne({product_id})
            if(productExists) return res.status(400).json({msg: "This product already exists."})
            const newProduct= new Products({
                product_id, title: title.toLowerCase() , price, description, content, images, category
            })
            await newProduct.save()
            res.json("Created a new product! ")


        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    updateProduct: async(req, res)=>{
        try{
            //Method: PUT - findOneAndUpdate
            const {product_id, title, price, description, content, images, category}= req.body;
            if(!images) return res.status(400).json({msg: "No image upload."})
            await Products.findOneAndUpdate({product_id},{
                title: title.toLowerCase(), price, description, content, images, category
            })
            res.json({msg:'Everything up to date!'})

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    deleteProduct: async(req, res)=>{
        try{
            //Method: DELETE
            await Products.findByIdAndDelete({_id: req.params.id})
            res.json({msg:'Deleted successfully!'})

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
}

module.exports= productCtrl