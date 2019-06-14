
var db=require('../mysql.js')
var ResultData=require('../lib/Result')
let users={}
users.login=(req,res)=>{
    // console.log(req)
    var sql=`SELECT * FROM user WHERE username='${req.body.userName}' AND password='${req.body.password}'`
    db.query(sql,(results)=>{
        // console.log(results)
        var data=ResultData(results.length,results[0])
        res.json(data)
      
    })
}

users.getUser=(req,res)=>{
    
    var pageIndex=(req.query.pageIndex-1)*(req.query.pageSize*1);
    var pageSize=req.query.pageSize*1;
    
    var sql=`SELECT id,username,role FROM user LIMIT ${pageIndex},${pageSize}`
    db.query(sql,(results)=>{
        var countSql=`SELECT COUNT(id) AS count from user`
        db.query(countSql,count=>{
            var data=ResultData(1,results,count[0].count)
            res.json(data)
        })
    })
}

users.createUser=(req,res)=>{
    var sql=`INSERT INTO user (username,password,role) VALUES('${req.body.userName}','${req.body.password}','${req.body.role}')`
    db.query(sql,(results)=>{
        // console.log(results)
        var data=ResultData(1,results)
        res.json(data)
      
    })
}

users.delUser=(req,res)=>{
    var sql=`DELETE FROM user WHERE id=${req.body.id}`
    db.query(sql,(results)=>{
        // console.log(results)
        var data=ResultData(1,results)
        res.json(data)
      
    })
}
module.exports=users
