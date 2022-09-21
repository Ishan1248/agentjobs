var express=require('express');
var app=express();
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/JobPortal');
var personShema=new mongoose.Schema({
    name:String,
    age:Number,
    nationality:toString,
});
var Person=mongoose.model("Person",personSchema);
app.put('/people/:id',function(req,res){
    Person.findByIdAndUpdate(req.params.id,req.body,function(err,response)
    {
     if(err) res.json({message:"Error in updating person with id"+req.params.id});
     res.json(response);
    });
});

app.listen(3000);

//session management
var cookieParser=require('cookie-parser');
var session=require('express-session');
var app=express();
app.use(cookieParser);
app.use(session({secret:"ssh,its a secret"}));
app.get('/',function(req,res){
    if(req.session.page_views){
        req.session.page_views++;
        res.send("You visited this page"+req.session.page_views+"times");
    }
    else{
        req.session.page_views=1;
        res.send("welcome to this page for first time");
    }
})
app.listen(3000);

