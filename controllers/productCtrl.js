const Products= require('../models/productModel')

//Filter, sorting and paginating
class APIfeatures{
    constructor(query, queryString){
        this.query= query;                  //all products 
        this.queryString= queryString;
    }
    filtering(){
        //create a list of excluded filed which includes 'page', 'sort', 'limit', 'skip' and delete their query
        //change queryString stringify by using JSON.stringify
        //replace queryStr when use params like gte, gt, lte, lt, regex
        //use JSON.parse(queryStr)  to get wanted results
        const queryObj= {...this.queryString}
        console.log({before: queryObj})
        const excludedFields= ['page', 'sort', 'limit']; //skip is not included in queryString
        excludedFields.forEach(el=>delete(queryObj[el]))
        console.log({after: queryObj})

        let queryStr= JSON.stringify(queryObj)
        queryStr= queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match=> '$'+match);
        console.log(queryStr)

        this.query.find(JSON.parse(queryStr))
        return this;

    }
    sorting(){
        //check if in queryString have method sort, split it by ',' and join by ' '
        //sort this query
        //if there is not sort method then sort by '-createdAt'
        if(this.queryString.sort){
            const sortBy= this.queryString.sort.split(',').join(' ')
            this.query= this.query.sort(sortBy)
        } else {
            this.query= this.query.sort('-createdAt')
        }
        return this;
    }
    paginating(){       
        const page= this.queryString.page*1||1
        const limit= this.queryString.limit*1||9
        const skip=  (page-1)*limit;
        this.query= this.query.skip(skip).limit(limit)
        return this;
    }
}
const productCtrl={
    getProducts: async(req, res)=>{
        try{
            //Method: GET
            //use features API to modify data
            //call features.query 
            const features= new APIfeatures(Products.find(), req.query)
                .filtering().sorting().paginating()
            const products= await features.query //query = all returned products

            res.json({
                status: 'success',
                result: products.length,
                products: products
            })

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