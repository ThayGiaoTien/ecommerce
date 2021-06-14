const Category= require('../models/categoryModel')
const Products= require('../models/productModel')

// 4 features get, create, update, delete
const categoryCtrl={
    getCategories: async(req, res)=>{
        try{
            //Method: GET
            //Fetch all categories
            const categories= await Category.find();
            if(!categories) return res.status(400).json({msg: "There is no category."})
            res.json(categories)
        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    createCategory: async(req, res)=>{
        try{   
            //Method: POST
            const {name} = req.body;
            const category= await Category.findOne({name})
            if(category) return res.status(400).json({msg: "This category already exists."})

            const newCategory= new Category({name})
            await newCategory.save()
            res.json({msg: "Created a new category. "})

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    updateCategory: async(req, res)=>{
        try{
            //Method: PUT
            const {name}= req.body;
            const thisCategory= await Category.findByIdAndUpdate({
                _id: req.params.id},{
                    name: {name}
            });
            res.json({msg: "Everything up to date!"})

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async(req, res)=>{
        try{
            //Method: DELETE
            //check if there is related products. ask delete products before delete category
            //???? const products = await Products.findOne({category: req.params.id})???
            const products = await Products.findOne({category: req.params.id});
            if(products) return res.status(400).json({msg: "Please delete all products with a relationship!"})
            await Category.findByIdAndRemove(req.params.id);
            res.json({msg: "Deleted a category successfully!"})
        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    }
}
module.exports= categoryCtrl
