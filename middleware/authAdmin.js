//we got req.user from auth, by using it we going to
//check role of user if role=0- not admin, if=0 next

const Users= require('../models/userModel')

const authAdmin= async(req, res, next)=>{
    try{
        const user= Users.findOne({_id: req.user._id})
        if(user.role===0) return res.status(400).json({msg: "Admin resources access denied!"})
        next()
    } catch(err){
        if(err) return res.status(500).json({msg: err.message})
    }
}
module.exports= authAdmin