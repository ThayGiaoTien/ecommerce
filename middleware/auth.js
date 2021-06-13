// try to get token by req.header -authorization and use jwt.verify to get a 
//decoded token, if true req.user= user\

const jwt= require('jsonwebtoken')
 

const auth= async(req, res, next)=>{
    try{
        const token= req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Invalid authentication!"})
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
            if(err) return res.status(400).json({msg: "Invalid authentication!"})
            req.user= user
            next()
        })
    } catch(err){
        if(err) return res.status(500).json({msg : err.message})
    }
}
module.exports= auth