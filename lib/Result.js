function result(state,data,count){
    var data={
        state:state,
        data:data
    }
    if(count || count==0){
        data.total=count
    }
    return data
}

module.exports=result;