const path = require("path");
const express = require("express");
const multer = require("multer");
//const upload=require({dest:"uploads/"});
//Documents Upload
const docStorage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null,file.originalname+'_'+Date.now()+path.extname(file.originalname));
    },
});
const docUpload=multer({storage:docStorage,limits:{fileSize:5000000},
filefilter(req,file,cb){
    if(!file.originalname.match(/\.(doc|docx|pdf)$/)){
    return cb(new Error("Only doc,docx and pdf files are allowed"));
}
cb(undefined,true);
}
});
module.exports=docUpload;

