var db=require('../mysql.js')
var ResultData=require('../lib/Result')
var warehouse={}
warehouse.getWarehouse=(req,res)=>{
    // console.log(req)
    var pageIndex=(req.query.pageIndex-1)*(req.query.pageSize*1);
    var pageSize=req.query.pageSize*1;
    var keywords=req.query.keywords;
    var s=""
    if(keywords!=""){
        s=`WHERE  concat(name,username,last_date,type,model) like '%${keywords}%'`
    }  
    var sql=`SELECT * FROM 
    warehouse  w LEFT JOIN product p ON w.product_id=p.id 
    LEFT JOIN user u ON w.last_operator=u.id ${s} LIMIT ${pageIndex},${pageSize}`
   
    db.query(sql,(results)=>{
        var countSql=`SELECT COUNT(*) AS count from warehouse`
        db.query(countSql,count=>{
            var data=ResultData(1,results,count[0].count)
            res.json(data)
        })
    })
}

//新产品入库
warehouse.newIn=(req,res)=>{
    var params=req.body;
    // console.log(req.body)
    //先查询是否存在
    var isInSql=`SELECT COUNT(*) count FROM 
    warehouse WHERE product_id=${params.product_id}`
    db.query(isInSql,count=>{
        if(count[0].count==0){
            var inSql=`INSERT INTO warehouse (product_id,last_date,last_operator,number)
             VALUES(${params.product_id},'${params.last_date}',${params.last_operator},${params.number})`
             db.query(inSql,(results)=>{
                params.entry_date=params.last_date
                params.operator=params.last_operator
                warehouse.inHis(params,()=>{
                    res.json({
                        message:"新产品入库成功！",
                        state:1
                    })
                })

            })
        }else{
            res.json({
                message:"该产品已存在请直接入库！",
                state:0
            })
        }
    })
}

//修改出入库
warehouse.setWarehouse=(req,res)=>{
    var params=req.body;
    var sql=`UPDATE  warehouse set number='${params.number}' WHERE product_id=${params.product_id}`
    db.query(sql,(results)=>{
        // console.log(results)
        if(params.type=='in'){
            params.number=params.operator_num
            warehouse.inHis(params,()=>{
                res.json({
                    message:"入库成功！"
                })
            })
        }else{
            params.number=params.operator_num
            warehouse.outHis(params,()=>{
                res.json({
                    message:"出库成功！"
                })
            })
        }
    })
}

warehouse.getHisIn=(req,res)=>{
    var pageIndex=(req.query.pageIndex-1)*(req.query.pageSize*1);
    var pageSize=req.query.pageSize*1;
    var keywords=req.query.keywords;
    var s=""
    if(keywords!=""){
        s=`WHERE  concat(name,username,entry_date) like '%${keywords}%'`
    }  
    var sql=`SELECT * FROM 
    historical_entry  h LEFT JOIN product p ON h.product_id=p.id 
    LEFT JOIN user u ON h.operator=u.id ${s} LIMIT ${pageIndex},${pageSize}`
   
    db.query(sql,(results)=>{
        var countSql=`SELECT COUNT(*) AS count from historical_entry`
        db.query(countSql,count=>{
            var data=ResultData(1,results,count[0].count)
            res.json(data)
        })
    })
}

warehouse.getHisOut=(req,res)=>{
    var pageIndex=(req.query.pageIndex-1)*(req.query.pageSize*1);
    var pageSize=req.query.pageSize*1;
    var keywords=req.query.keywords;
    var s=""
    if(keywords!=""){
        s=`WHERE  concat(name,username,entry_date) like '%${keywords}%'`
    }  
    var sql=`SELECT * FROM 
    historical_out  h LEFT JOIN product p ON h.product_id=p.id 
    LEFT JOIN user u ON h.operator=u.id ${s} LIMIT ${pageIndex},${pageSize}`
   
    db.query(sql,(results)=>{
        var countSql=`SELECT COUNT(*) AS count from historical_out`
        db.query(countSql,count=>{
            var data=ResultData(1,results,count[0].count)
            res.json(data)
        })
    })
}

//入历史库
warehouse.inHis=(params,callback)=>{
    var sql=`INSERT INTO historical_entry (product_id,entry_date,operator,number)
    VALUES (${params.product_id},'${params.entry_date}',${params.operator},${params.number})`
    db.query(sql,result=>{
        callback&&callback()
    })
}

//出历史
warehouse.outHis=(params,callback)=>{
    var sql=`INSERT INTO historical_out (product_id,out_date,operator,number)
    VALUES (${params.product_id},'${params.out_date}',${params.operator},${params.number})`
    db.query(sql,result=>{
        callback&&callback()
    })
}

//历史记录
warehouse.getHis=(req,res)=>{
    var pageIndex=(req.query.pageIndex-1)*(req.query.pageSize*1);
    var pageSize=req.query.pageSize*1;
    var sql=`SELECT * FROM (SELECT product_id,entry_date,entry_date as out_date,operator,number
        FROM historical_entry WHERE product_id=${req.query.product_id}
       UNION ALL 
       SELECT product_id,0,out_date,operator,number 
       FROM historical_out WHERE product_id=${req.query.product_id}) as a LEFT JOIN product as p ON a.product_id=p.id 
       LEFT JOIN user u ON a.operator=u.id
       ORDER BY out_date DESC LIMIT ${pageIndex},${pageSize}`

       db.query(sql,(results)=>{
        var countSql=`SELECT COUNT(*) AS count FROM (SELECT product_id,entry_date,entry_date as out_date,operator,number
            FROM historical_entry WHERE product_id=${req.query.product_id}
           UNION ALL 
           SELECT product_id,0,out_date,operator,number 
           FROM historical_out WHERE product_id=${req.query.product_id}) as a LEFT JOIN product as p ON a.product_id=p.id 
           
           ORDER BY out_date DESC`
        db.query(countSql,count=>{
            var data=ResultData(1,results,count[0].count)
            res.json(data)
        })
    })
}
module.exports=warehouse