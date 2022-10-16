const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {authConfig}=require('../../../config').appConfig


const comparePassword=(GivenPassword,SavedPassword,cb)=>{
    bcrypt.compare(GivenPassword,SavedPassword,(err,result)=>{
        if(err) cb(err);
        cb(null,result);
    })
}

const generateToken=(payload,done)=>{
    jwt.sign(payload,authConfig.jwtSecret,done)
}

const authenticateuser=(req,res,next)=>{
    var token=req.get('Authorization');
    
    if(!token || typeof myVar == 'Undefined') res.send({message:"Invalid user"})
    console.log(token)
    token=token.replace('Bearer ','')
    jwt.verify(token,authConfig.jwtSecret,(err,decoded)=>{
        if(err) res.send({message:"User is invalid"})
        else{
            console.log(decoded);
            req.data=decoded
            next()
        }
    })
}
const authenticateadmin=(req,res,next)=>{
    var token=req.get('Authorization');
    console.log(token)
    if(!token) res.send({message:"Invalid admin"})
    token=token.replace('Bearer ','')
    jwt.verify(token,authConfig.jwtSecret,(err,decoded)=>{
        if(err) res.send({message:"User is invalid",err:err})
        else{
            console.log(decoded);
            req.data=decoded
            next()
        }
    })
}

const checkRole = (req, res, next) => {
    let token = req.session.token;
  
    if (!token) {
      return res.status(403).send({ message: "sorry user not logged in" });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized" });
      }
      else {
        req.userId = decoded.id;
        admin.findById({ _id: req.userId }).exec((err, admin) => {
          if (err) {
            res.status(500).send({ error:err });
            return;
          }
          if(!admin){
            res.send({message: "Require Admin Access"})
          }
          else {
            next();
          }
        })
      }
    });
  };

module.exports={
    comparePassword,
    generateToken,
    authenticateuser,
    authenticateadmin,
    checkRole
}