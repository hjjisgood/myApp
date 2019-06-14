(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4f184ca6"],{"0287":function(e,t,a){},3872:function(e,t,a){"use strict";var r=a("0287"),s=a.n(r);s.a},8576:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticStyle:{"margin-bottom":"20px"}},[a("div",[a("Button",{attrs:{type:"primary"},on:{click:e.showModel}},[e._v("新建用户")])],1)]),a("Table",{attrs:{border:"",columns:e.columns,data:e.dataList}}),a("div",{staticStyle:{"margin-top":"20px",float:"right"}},[a("Page",{attrs:{total:e.total,"show-sizer":""},on:{"on-change":e.changePage,"on-page-size-change":e.changePageSize}})],1),a("Modal",{attrs:{title:"新增","mask-closable":!1,loading:e.loading},on:{"on-ok":e.ok},model:{value:e.modal,callback:function(t){e.modal=t},expression:"modal"}},[a("div",[a("Form",{ref:"Form",attrs:{model:e.formItem,"label-position":"right","label-width":100,rules:e.rules}},[a("FormItem",{attrs:{label:"姓名",prop:"userName"}},[a("Input",{model:{value:e.formItem.userName,callback:function(t){e.$set(e.formItem,"userName",t)},expression:"formItem.userName"}})],1),a("FormItem",{attrs:{label:"密码",prop:"password"}},[a("Input",{attrs:{type:"password"},model:{value:e.formItem.password,callback:function(t){e.$set(e.formItem,"password",t)},expression:"formItem.password"}})],1),a("FormItem",{attrs:{label:"角色"}},[a("Select",{model:{value:e.formItem.role,callback:function(t){e.$set(e.formItem,"role",t)},expression:"formItem.role"}},[a("Option",{attrs:{value:"普通员工"}},[e._v("普通员工")]),a("Option",{attrs:{value:"超级管理员"}},[e._v("超级管理员")])],1)],1)],1)],1)])],1)},s=[],o=(a("cadf"),a("551c"),a("097d"),a("66df")),n=function(e){return o["a"].request({url:"/users/getUser",method:"get",params:e})},i=function(e){return o["a"].request({url:"/users/createUser",method:"post",data:e})},l=function(e){return o["a"].request({url:"/users/delUser",method:"post",data:e})},u={name:"user-page",data:function(){var e=this;return{pageIndex:1,pageSize:10,total:0,modal:!1,formItem:{userName:"",password:"",role:"普通员工"},loading:!0,rules:{userName:[{required:!0,message:"姓名不能为空",trigger:"blur"}],password:[{required:!0,message:"密码不能为空",trigger:"blur"}]},columns:[{title:"姓名",key:"username"},{title:"角色",key:"role"},{title:"操作",key:"action",width:150,align:"center",render:function(t,a){return t("div",[t("Button",{props:{type:"error",size:"small"},on:{click:function(){e.$Modal.confirm({title:"确定删除吗？",onOk:function(){e.delUser(a.row.id)}})}}},"删除用户")])}}],dataList:[]}},mounted:function(){this.getUser()},methods:{changePage:function(e){this.pageIndex=e,this.getUser()},changePageSize:function(e){this.pageSize=e,this.getUser()},showModel:function(){this.modal=!0,this.formItem.userName="",this.formItem.password=""},ok:function(){var e=this;this.$refs.Form.validate(function(t){t?(e.createUser(),e.modal=!1):(e.loading=!1,e.$nextTick(function(){e.loading=!0}))})},getUser:function(){var e=this,t={pageIndex:this.pageIndex,pageSize:this.pageSize};n(t).then(function(t){200==t.status?(e.dataList=t.data.data,e.total=t.data.total):(e.dataList=[],e.total=0)})},createUser:function(){var e=this;i(this.formItem).then(function(t){200==t.status?(e.$Message.success("新增成功"),e.getUser()):e.$Message.error("服务器错误")})},delUser:function(e){var t=this;l({id:e}).then(function(e){200==e.status?(t.$Message.success("删除成功"),t.getUser()):t.$Message.error("服务器错误")})}}},m=u,c=(a("3872"),a("2877")),d=Object(c["a"])(m,r,s,!1,null,null,null);d.options.__file="user.vue";t["default"]=d.exports}}]);