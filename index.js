const express=require("express")
const app=express()
const cors=require("cors")
const mongoose=require("mongoose")
app.use(express.json())
app.use(cors())
const nodemailer = require("nodemailer");
//install nodemailer
mongoose.connect("mongodb+srv://user1:useradmin@cluster0.etczk.mongodb.net/passkey").then(function(){
    console.log("database connected")
}).catch(function(){
    console.log("database not connected")
})
const credential=mongoose.model("credential",{},"bulkmail")
credential.find().then(function(data){
    const transporter = nodemailer.createTransport({
        service:"gmail",
         auth: {
           user: data[0].toJSON().user,
           pass:  data[0].toJSON().pass,
         },
       });
       
app.post("/sendemail",function(req,res){
    debugger
        var msg=req.body.msg
        var emailList=req.body.emailList
     new Promise(async  function(resolve,reject){
        try{
            for(i=0;i<emailList.length;i++)
                {
               await transporter.sendMail(
                    {
                    from:"rajeshwarimathavan@gmail.com",
                    to:emailList[i],
                    subject:"A message from bulk mail app",
                    text:msg
                }
            )
               console.log("email sent to "  + emailList[i])
            }
           resolve("Success")
        }
       catch(error){
       reject("Failed")
       }
     }).then(function(){
        res.send(true)
     }).catch(function(){
        res.send(false)
     })
       
       
    })
    console.log()
}).catch(function(){
    console.log("error")
})






app.listen(5000,()=>console.log("server started"))