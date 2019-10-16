const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    //Register User
    create: (req,res,next)=> {
        userModel.find({email:req.body.email},function(err,data){
            if(data.length){
                res.json({status:'error',message:'user already regsitered'})
            }else{
                userModel.create({name:req.body.username,email:req.body.email,password:req.body.password,status:true,token:null},(err,result)=>{
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

    //Authenticate and login user
    authenticate: (req,res,next) =>{
        userModel.findOne({email:req.body.email},(err,userInfo)=>{
            if(err)
                next(err);
            else{
                if(bcrypt.compareSync(req.body.password,userInfo.password)){
                    const token = jwt.sign({id:userInfo._id},req.app.get('secretKey'),{expiresIn:'1h'});
                    userModel.findOneAndUpdate(req.body.email,{token:token,last_login:Date.now()},function(err,userInfo){
                    res.json({status:"success",message:"User Found!!",data:{user:userInfo, token:token}});
                    })
                } else{
                    res.json({status:"error",message:'Invalid Username/Password',data:null});
                }
            }
        })
    },

    //Logout 
    logout:(req,res,next) =>{
        userModel.findByIdAndUpdate(req.params.userId,{status:false,token:null},function(err,userInfo){
            if(err){
                console.log(req.params.userId);
                next(err)
            }else{
                res.json({status:"success",message:"Successfully Logged out",data:userInfo})
            }
        })
        console.log(req.params.userId);
    },

    getAll:(req,res,next) =>{
        let userList = [];
        userModel.find({},(err,users)=>{
            if(err){
                next(err);
            }
            else{
                for (let user of users){
                    userList.push({id: user._id,email: user.email,name:user.name,password:user.password,status:user.status,token:user.token,last_login:user.last_login,sent_messages:user.sent_messages,received_messages:user.received_messages})
                }
                res.json({status:'success',message:'users found',data:userList});
            }
        })
    },

    getUser:(req,res,next) =>{
        userModel.findById(req.params.userId,function(err,userInfo){
            if(err){
                next(err);
            }else{
                res.json({status:"success",message:"User Found",data:userInfo});
            }
        })
    },
    sendMessage:(req,res,next)=>{
        userModel.findOne({email:req.body.sender},function(err,userInfo){
            
          if(err){
              next(err);
          }else{
               if(userInfo.sent_messages.length > 0){

               }else{
                    userModel.findOneAndUpdate({email:req.body.sender},{sent_messages:{receiver:req.body.receiver,message:req.body.message}},function(err,data){
                        if(err){
                            next(err)
                        }else{
                            res.json({status:"success",message:"message sent",data});
                        }
                    });
               } 
          }
        })
    }



}