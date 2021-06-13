// try to get token by req.header -authorization and use jwt.verify to get a 
//decoded token, if true req.user= user\

const jwt= require('jsonwebtoken')
 

const auth= async(req, res, next)=>{
    try{
        const token= req.header("Authentication")
        if(!token) return res.status(400).json({msg: "Invalid Authentication!"})
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (user, err)=>{
            if(err) return res.status(400).json({msg: "Invalid Authentication!"})
            req.user= user
            next()
        })
    } catch(err){
        if(err) return res.status(500).json({msg : err.message})
    }
}
module.exports= auth