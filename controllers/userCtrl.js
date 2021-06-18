const Users= require('../models/userModel')
const Payments= require('../models/paymentModel')
 
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const { json } = require('express')

//access token contains the security credentials for a login section and
//identifies the user!

// create 2 functions to create access token and auto refresh it
const createAccessToken= (user)=>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '9m'})
}
const createRefreshToken= (user)=>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}
// from user._id we created token, so from token we can use jwt.verify to find user._id


const userCtrl= {
    register: async(req, res)=>{
        //method: POST
            //get name, email, password from req.body, check if exists, 
            //check length of password, then hash with 10 and return
            //if everything is oke then create new user with new Users, wait until it is saved
            //then create accesstoken and refreshaccesstoken and save to cookie
        try{
            const {name, email, password} = req.body;
            const userExists= await Users.findOne({email})
            if (userExists) return res.status(400).json({msg: "This email already exists."})
            if(password.length<6) return res.status(400).json({msg: "Password is at least 6 characters long."})
            console.log({password})
            const hashedPassword= await bcrypt.hash(password, 9);
            console.log(hashedPassword)
            const newUser= new Users({
                name, email, password: hashedPassword
            })
            await newUser.save()
            
            const accesstoken= createAccessToken({id: newUser._id})
            const refreshtoken= createRefreshToken({id: newUser._id})
            res.cookie("refreshtoken", refreshtoken,{
                httpOnly: true, 
                path: '/user/refresh_token',
                maxAge:7*24*60*60*1000 //7d
            })
            
            
            res.json({msg: "register succeed! "})
        } catch(err){
            if(err) return res.status(500).json({msg: err.message})
        }
    },
    login: async(req, res)=>{
        try{
        //method: POST
        //compare password req from body to user.password in db
        //create token and save to cookie
            const {email, password} = req.body;
            const user= await Users.findOne({email}) // fuckkkkkkkk!!!! 
            if(!user) return res.status(400).json({msg: "Incorrect email."})
        
            const isMatch= await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Incorrect password!"})
            // If login success , create access token and refresh token
            const accesstoken= createAccessToken({id: user._id})
            const refreshtoken= createRefreshToken({id: user._id})

            res.cookie("refreshtoken", refreshtoken,{
                httpOnly: true, 
                path: '/user/refresh_token',
                maxAge:7*24*60*60*1000 //7d
            })
            
            res.json({accesstoken, refreshtoken, msg: "logged in"})
            
        } catch(err){
            if(err) return res.status(500).json({msg: err.message})
        }
    },
    logout: async(req, res)=>{
        try{
        //method: GET
        //user clearCookie 
        res.clearCookie('refreshtoken', {path: 'user/refresh_token'})
        res.json({msg: "Logged out!"})
        } catch(err){
            if(err) return res.status(500).json({msg: err.message})
        }
    },
    refreshToken: (req, res)=>{
        try{
        //method: GET
        //request refreshtoken from cookies.refreshtoken, verify to check user
        // and then create new accesstoken 
        const rf_token= req.cookies.refreshtoken;
        if(!rf_token) return res.status(400).json({msg: "Please register or login"})
        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
            if(err) return res.status(400).json({msg: "Invalid Authentication"})
            const accesstoken= createAccessToken({id: user.id})
            res.json({accesstoken})
        })

        } catch(err){
            if(err) return res.status(500).json({msg: err.message})
        }
    },
    getUser: async(req, res)=>{
        try{
            //method: GET
        //get user from db(.select("-password") by user.id
        
        const user= await Users.findById(req.user.id).select("-password");
        if(!user) return res.status(400).json({msg: "User does not exist."})
        res.json({user})

        } catch(err){
            if(err) return res.status(500).json({msg: err.message})
        }
    },
    history: async(req, res)=>{
        try{
            //Method: GET
            //fetching payment history using req.user.id
            const history= await Payments.find({user_id: req.user.id})
            if(!history) return res.status(400).json({msg: "There is no payment"})
            res.json(history)
        } catch(err){
            if(err) return res.status(500).json({msg: err.message})
        }
    },
    addCart: async(req, res)=>{
        try{
            //Method: PATCH
            //findOneAndUpdate
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."})

            await Users.findOneAndUpdate({_id: req.user.id}, {
                cart: req.body.cart
            })

            return res.json({msg: "Added to cart"})

        } catch(err){
            if(err) return res.status(500).json({msg: err.message})
        }
    }

}
module.exports= userCtrl
