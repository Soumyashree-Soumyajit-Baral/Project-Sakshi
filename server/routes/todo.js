const express=require("express")
const router=express.Router()
const jwt=require("jsonwebtoken")
const todoModal = require("../Modals/todo-modal");
const UserModal = require("../Modals/register-modal")

router.post("/addtask", (req, res)=>{
    try {
        const user = jwt.verify(req.headers.authorization, process.env.SECRET_KEY );
        UserModal.find({userName:user}).then((data)=>{
            if(data.length){
                todoModal.create({
                    activity:req.body.activity,
                    status: req.body.status,
                }).then(()=>{
                    res.status(200).send("Activity Added")
                })
            } else{
                res.status(400).send('Uauthorize user')
            }
        }).catch((err)=>{
            res.status(400).send(err);
        })

    } catch(err) {
        // console.log(err)
        res.status(400).send("Unauthorize user")
    }    
   
})

router.get("/todo", (req,res)=>{
    const user = jwt.verify(req.headers.authorization, process.env.SECRET_KEY )
    UserModal.find({userName:user}).then((data)=>{
        if(data.length){
            todoModal.find({activity:req.body.activity}).then((data)=>{
                res.status(200).send({task: data})
            })
        } else{
            res.status(400).send('Unauthorize user')
        }
    }).catch((err)=>{
        res.status(400).send(err.message)
    })
});
module.exports=router