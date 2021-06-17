const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
  const fname=req.body.fName;
  const lname=req.body.lName;
  const email=req.body.email;
  const data={
    members:[
      {email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:fname,
        LNAME:lname
      }
    }
    ]
  }
  const JSONdata=JSON.stringify(data);
  const url="https://us17.api.mailchimp.com/3.0/lists/c910f86691";
  const options={
    method:"POST",
    auth:"Lakshmi1:f2acf7ee978b5abc1e3e53fe2766960f-us17"
  }
  const request=https.request(url,options,function(response){
  //h  console.log(response.statusCode);
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
  }
  else{
      res.sendFile(__dirname+"/failure.html");
  }
response.on("data",function(resData){
})
});
request.write(JSONdata);
request.end();

})

app.listen(process.env.PORT||3000,function(){
  console.log("Server is running at "+process.env.PORT);
})
