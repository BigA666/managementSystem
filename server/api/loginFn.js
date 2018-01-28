let jwt = require('jsonwebtoken') 
let fs = require('fs')
module.exports = function(req, res){ // http://localhost:3000/admin/loginUser
    // res.writeHead(200,{  // 不用写
    //     'Content-Type': 'application/json;charset=utf-8',
    //     'Access-Control-Allow-Origin': '*'
    // })
    console.log('login')
    // console.log(req.body) // 获取查询语句
    let token = jwt.sign(req.body, '1508B', {expiresIn: 60*30})
                        // 参数一 必须是一个object, buffer或者string    
                        // 参数二 包含HMAC算法的密钥或RSA和ECDSA的PEM编码私钥的string或buffer
                        // 参数三 有效时间 expiresIn：以秒表示或描述时间跨度zeit / ms的字符串。如60，"2 days"，"10h"，"7d"，Expiration time，过期时间
    
    // 文件路径是相对于引用位置而言而非定义位置，即 相对于server.js                    
    const userData = JSON.parse(fs.readFileSync('./data/user.json',{encoding: 'utf-8'}))
    let flag = false, response

    userData.map((v, k) => {
        if(v.name === req.body.user_name){
            flag = true
            if(v.password === req.body.user_password){
                response = {
                    "code": 1,
                    "token": token,
                    "authorization": v.authorization,
                    "msg": "Success"
                }
            }else{
                response = {
                    "code": 2,
                    "msg": "密码错误"
                }
            }
        }
    })
    if(!flag){
        
        response = {
            "code": 3,
            "msg": "用户不存在"
        }
        
    }

    // let obj = {
    //     'code': 1,
    //     'data': {
    //         'showName': '系统管理员', // 显示名
    //         'loginName': 'admin',    // 登录名
    //         'id': 20                 // 用户id
    //     },
    //     'token': token,
    //     'msg': 'SUCCESS'
    // }
    res.end(JSON.stringify(response))
}