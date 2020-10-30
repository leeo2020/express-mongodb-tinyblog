### 1.使用express-generator初始化项目
```shell
npm i -g express-generator //全局安装
express --view=ejs blog//初始化项目
cd blog/
npm install //在项目下安装所需包
npm start //启动项目nodemon实时重启
```
### 2.express-generator模块详解

- package.json:项目信息描述

- script:npm快捷键 npm run key

- cookie.parse:用于解析cookie会话数据

- margon:日志工具

- serve-favicon:设置网站favicon图标
    ```shell
    npm i -S serve-favicon
    ```
- express-session:服务端记录用户session简单信息

    ```shell
    npm i -S express-session
    ```

### 3.数据库集合结构

- 在项目中新建db目录,用于存放数据库连接文件和数据库模型文件

    ```shell
    cd blog/  
    mkdir md 
    ```

- connect.js数据库链接文件

- userModel.js用户集合文件

- articleModel.js文章集合文件

    ```javascript
    //npm i -S mongoose
    const mongoose=require('mongoose')
    mongoose.connect('mongodb://localhost:21017/shaop')
    const conn=mongoose.connection
    if(conn){
    console.log('连接成功')
    }else{
    console.log('连接失败')
    }
    ```

    ```javascript
    const mongoose=require('mongoose')
    const schema=mongoose.Schema({
        author:String,
        title:String,
        content:String,
        createTime:Number
    })
    var articleModel=mongoose.model('articles',schema)
    module.exports=articleModel
    ```

    ```javascript
    const mongoose=require('mongoose')
    const schema=mongoose.Schema({
        userName:String,
        userPwd:String
    })
    var useerModel=mongoose.model('articles',schema)
    module.exports=userModel
    ```

### 4.public和views目录

```markdown
    public
        包括stylesheets,images,javascripts等静态资源
    views
        所有html放入(除了error.html)
        后缀名改为ejs
        提取相同部分利用include导入
            <%-include('bar',{})%>
            <%-include('head',{})%>
        修改css,js,img等的链接地址，以Public为根目录
```
### 5.路由
|     路由      |       功能        | 请求方式 |            入参             |   返回值   |           说明           |
| :-----------: | :---------------: | :------: | :-------------------------: | :--------: | :----------------------: |
|       /       | 编译index.ejs模板 |   get    |          page,size          | index页面  |            无            |
|    /regist    |  编译regist模板   |   get    |             无              | regist页面 |            无            |
|    /login     |   编译login模板   |   get    |             无              | login页面  |            无            |
|    /wtite     |   编译write模板   |   get    |             id              | write页面  | id有表示更改，无表示写入 |
|   /details    |  编译details模板  |   get    |             id              |  details   |           页面           |
| /users/regist |     注册业务      |   post   | username,password,password2 |   重定向   |      成功到登陆页面      |
| /users/login  |     登陆业务      |   post   |      username,password      |   重定向   |        成功后到主页        |
| /users/logout |    logout业务     |   get    |      username,password      |   重定向   |          成功到login页面          |
| /articles/wtrite | 文章增，改业务 | post | title,content,username,id | 重定向 | 有id是修改业务,无id是新增业务,成功重定向/,失败重定向/write |
| /articles/dlete |   文章删除业务    |   get    |             id              |   重定向   | 成败到主页 |
| /articles/upload |   文件上传业务    |   post   |            file             |   重定向   | ｛err:,msg:图片路径｝ |




### 6.模板子路由
```javascript
const express=require('express')
```
### 7.用户子路由

### 8.文章子路由