const express=require("express");
const path=require("path");
const multer=require("multer");
//Video Upload storage location
const videoStorage=multer.diskStorage({
    destination:"videos",
     filename:(req,file,cb)=>{
        cb(null,file.originalname+'_'+Date.now()+path.extname(file.originalname));
     }
    });
//Video Upload
const videoUpload=multer({storage:videoStorage,
    limits:{filesize:100000000},
    filefilter:(req,file,cb)=>{
        if(!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)){
            return cb(new Error("Only mp4,MPEG-4 and mkv files are allowed"));
        }
        cb(undefined,true);
}
   });
   module.exports=videoUpload;
