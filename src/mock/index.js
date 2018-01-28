import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import arr from '../../server/data/entry.json'

import Mock from 'mockjs'
// var fs = require('fs') //不能再webpack环境下（即这里）引用，只能在node环境（即server.js）下引用
let mock = new MockAdapter(axios.create())  // 创建一个新的实例 互不影响
export default {
    boostrap () {
        mock.onPost('/api/entry').reply(function() {
            return new Promise(function(resolve, reject) {
                resolve([200, arr])
            })
        }) 
    // 邀请名单
        // let arr = Mock.mock({
        //     "code": 1,
        //     "msg": "SUCCESS",
        //     "data": {
        //         "recordsTotal": 2,  //总记录数
        //         "data|100": [{
        //             "id": '@increment',   //参与者id
        //             "userName": "@cname",  //姓名 "18627891872"
        //             "userPhone": /1(3|5|7|8)\d{9}/,   //手机号
        //             "gender": {
        //                 "name|1": ["男","女"],
        //                 "value": "MAN"
        //             },     //性别
        //             "age|20-50": 20,
        //             "dateOfBirth":"", //出生日期
        //             "smsStatus|1": ["未通知", "已通知"],
        //             // "smsStatus":{ //短信通知状态 NONE:未通知 NOTIFIED ： 已通知
        //             //     "name" : "未通知E",
        //             //     "value": "NONE"
        //             // },
        //             "remark" : "" //备注
        //         }]
        //     }
        // })
        // console.log(JSON.stringify(arr))
        // fs.writeFileSync('../../server/data/user_list.json', JSON.stringify(arr))
        
    // 报名名单
        // let arr = Mock.mock({
        //     "code": 1,
        //     "message": "success",
        //     "data|100": [{
        //         "id": "@increment",
        //         "userName": "@cname",
        //         "userPhone": /1(3|5|7|8)\d{9}/,
        //         "remark": '',
        //         "signUpTime": '@date("yyyy-MM-dd")'
        //     }]
        // })
        // console.log(JSON.stringify(arr))
    
    }
}
