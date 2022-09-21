var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var multer=require('multer');
var upload=multer();
var session=require('express-session');
var cookieParser=require('cookie-parser');
app.set('view engine','pug');
app.set('views','./views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret:"Shh,its a secret"}));
var Users=[];
app.get("/signup",function(req,res){
    res.render("signup");
})
app.Post("/signup",function(req,res){
    if(!req.body.id || req.body.password){
        res.status("400");
        res.send("Invalid details!");
    }
    else{
        Users.filter(function(req,res){
            if(user.id===req.body.id){
                res.render("signup",{message:"User already exist!"});
            }
        });
        var newUser={id:req.body.id ,password:req.body.password};
        Users.push(newUser);
        req.session.user=newUser;
        res.redirect("/protected_page");
    }
});
app.listen(3000);