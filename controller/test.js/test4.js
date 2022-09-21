var expess=require('express');
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var multer=require('multer');
var upload=multer();

var app=express();
app.use(cookie-parser);
app.use( bodyParser.json);
app.use(bodyParser.urlencoded({extended:true}));
app.use(upload.array());

//require movie router
var movie=require('./routes/movie');

//use route for movies
app.use("/movies",movie);
app.listen(3000);


//movies
var express=require('express');
var router=express.Router();
var movies=[{id:101,name:'fight club',year:1999,rating:9.1},
{id:102,name:"Titanic", year:1987 ,rating:8.9},
{id:103,nmame:"The batman",year:2000,rating:8.8},
{id:104,name:"The spiderman",year:2005,rating:8.7}
];
module.exports=router;

//get routes
app.get("/",function(req,res){
    res.json(movies);
})

//get movie by id

router.get("/:id[0-9]{3,}",function(req,res){
    var currmovie=movies.filter(function(movie){
        if(movie.id==req.params.id){
            return true;
        }
    })


if(currmovie.length==1){
    res.json(currmovie[0])
}else{
    res.status(404);
    rs.json({message:"movie not found"});
}
});

