
var db=require('../mysql.js')
var ResultData=require('../lib/Result')
let products={}
products.getProducts=(req,res)=>{
    // console.log(req)
    var pageIndex=(req.query.pageIndex-1)*(req.query.pageSize*1);
    var pageSize=req.query.pageSize*1;
    var keywords=req.query.keywords;
    var s=""
    if(keywords!=""){
        s=`WHERE  concat(name,type,model) like '%${keywords}%'`
    }  
    var sql=`SELECT * FROM product ${s} LIMIT ${pageIndex},${pageSize}`
   
    db.query(sql,(results)=>{
        var countSql=`SELECT COUNT(id) AS count from product`
        db.query(countSql,count=>{
            var data=ResultData(1,results,count[0].count)
            res.json(data)
        })
    })
}

products.createProduct=(req,res)=>{
    var sql=`INSERT INTO product (name,type,model,image) VALUES('${req.body.name}','${req.body.type}','${req.body.model}','${req.body.image}')`
    db.query(sql,(results)=>{
        // console.log(results)
        var data=ResultData(1,results)
        res.json(data)
      
    })
}

products.editProduct=(req,res)=>{
    var params=req.body
    var sql=`UPDATE  product set name='${params.name}',type='${params.type}',model='${params.model}',image='${params.image}' WHERE id=${params.id}`
    console.log(sql)
    db.query(sql,(results)=>{
        // console.log(results)
        var data=ResultData(1,results)
        res.json(data)
      
    })
}

module.exports=products