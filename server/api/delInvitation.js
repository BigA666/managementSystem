
let user_list = require('../data/user_list.json')
let fs = require('fs')
let jwt = require('jsonwebtoken')
module.exports = function(req, res){
    
    jwt.verify(req.body.token, '1508B', (err, decoded) => {
        if (err) {
            err.code = 1001 // 登陆超时
            err.message = '登陆超时，请重新登陆'
            res.end(JSON.stringify(err))
        } else {
            
            user_list.data.data.map((v, k) => {
                if(v.id == req.body.id){
                    user_list.data.data.splice(k, 1)
                }
            })
            fs.writeFileSync('./data/user_list.json', JSON.stringify(user_list))
            
            const pageData = user_list.data.data
            let begin = (req.body.pageSize-1) * req.body.count
            let newArr = pageData.slice(begin, begin + req.body.count)
            res.end(JSON.stringify(newArr)) 
        }
        
        
    })
    
}