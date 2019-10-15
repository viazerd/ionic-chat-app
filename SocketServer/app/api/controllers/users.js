const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: (req,res,next)=> {
        userModel.find({email:req.body.email},function(err,data){
            if(data.length){
                res.json({status:'error',message:'user already regsitered'})
            }else{
                userModel.create({name:req.body.username,email:req.body.email,password:req.body.password,status:true},(err,result)=>{
                    if(err)
                        {
                            next(err);
                            // console.log(err);
                            console.log(req.body.username)
                            console.log(req.body.email)
                            console.log(req.body.password)
                        }
                    else
                        res.json({status:"success",message:"User Registration Successful",data:null});
                });
            }
        })
    },

    authenticate: (req,res,next) =>{
        userModel.findOne({email:req.body.email},(err,userInfo)=>{
            if(err)
                next(err);
            else{
                if(bcrypt.compareSync(req.body.password,userInfo.password)){
                    const token = jwt.sign({id:userInfo._id},req.app.get('secretKey'),{expiresIn:'1h'});
                    res.json({status:"success",message:"User Found!!",data:{user:userInfo, token:token}});
                } else{
                    res.json({status:"error",message:'Invalid Username/Password',data:null});
                }
            }
        })
    },

    getAll:(req,res,next) =>{
        let userList = [];
        userModel.find({},(err,users)=>{
            if(err){
                next(err);
            }
            else{
                for (let user of users){
                    userList.push({id: user._id,name:user.name,password:user.password,status:user.status})
                }
                res.json({status:'success',message:'users found',data:{users:userList}});
            }
        })
    }


}