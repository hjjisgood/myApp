let multer  = require('multer');
var express = require('express');
let upload = multer({ dest: 'img/' })
const path= require('path')
const fs=require('fs')
var router = express.Router();
router.post('/img',upload.single('file'),(req,res,next)=>{//avater是上传文件的key
    // req.file 是 `avatar` 文件的信息
   
    
    //直接上传的是乱码的文件名
    // 解决方法:重新修改文件名,格式:fs.renameSync(旧路径,新路径)

    // 3.1旧路径直接req.file.path,
    let oldPath=req.file.path;
    // 3.2新路径要先拼接:
    let newPath=path.join(__dirname,'uploads',req.file.originalname)
    // 3.3修改文件名:
    fs.rename(oldPath,newPath,(err)=>{
        res.json({
            url:req.file.filename
        });
    });
    
})

module.exports = router;