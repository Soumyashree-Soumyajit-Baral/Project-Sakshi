const express=require("express")
const bcrypt=require("bcryptjs")
const router=express.Router()
const jwt=require("jsonwebtoken")
const UserModal = require("../Modals/register-modal")
const {checkExistingUser, generatePasswordHash} = require("../utility");

//const salt=10

router.post('/register',async(req,res)=>{
    if(await checkExistingUser(req.body.userName)) {
        res.status(400).send("UserExist");
    } else {
        generatePasswordHash(req.body.password).then((passwordHash)=> {
            UserModal.create({
                userName: req.body.userName,
                password: passwordHash,
                confirmPass : req.body.confirmPass

            })
            .then(()=> { 
                res.status(200).send(`${req.body.userName} added successfully`); 
            }).catch((err)=> {
                res.status(400).send(err.message)
            })
        });
    }
   
});

router.post('/login',(req,res)=>{
    UserModal.find({userName: req.body.userName}).then((userData)=> {
        if(userData.length) {
            bcrypt.compare(req.body.password, userData[0].password).then((val)=> {
                if(val) {
                    const AuthToken = jwt.sign(userData[0].userName, process.env.SECRET_KEY);
                    res.status(200).send({AuthToken, userName: userData[0].userName});
                } else {
                    res.status(400).send("Invalid Password");
                }
            })
        } else {
            res.status(400).send("Invalid user");
        }
    })
  
})
router.get("/user",(req,res)=>{
    try {
      const user = jwt.verify(req.headers.authorization, process.env.SECRET_KEY );
      UserModal.find({userName : user}).then((data)=>{
        // console.log(data)
        res.status(200).send({user: data});
      }).catch((err)=>{
        res.status(400).send(err);
      })
  } catch(err) {
      res.status(400).send("Unauthorize user", err)
  }  

  })

module.exports=router;