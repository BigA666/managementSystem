let jwt = require('jsonwebtoken')  // npm install jsonwebtoken -D  设置密钥
var fs = require('fs') //只能在node环境中引用，即这里

module.exports = function(req, res){
    let token = jwt.sign(req.body, '1508B', {expiresIn: 60*30})
    console.log('register')
    let userData = JSON.parse(fs.readFileSync('./data/user.json', {encoding: 'utf-8'}))
    let response, flag = false
    userData.map((v, k) => {
        if(v.name === req.body.user_name){
            flag = true
            response = {
                "code": 1,
                "token": token,
                "msg": "用户已存在"
            }
        }
    })
    if (!flag) {
        userData.push({
            'name': req.body.user_name,
            'password': req.body.user_password,
            'authorization': req.body.authorization
        })
        fs.writeFileSync('./data/user.json', JSON.stringify(userData), {encoding: 'utf-8'})
        response = {
            "code": 2,
            "token": token,
            "authorization": req.body.authorization,
            "msg": "注册成功"
        }
    }
    
    res.end(JSON.stringify(response))
}