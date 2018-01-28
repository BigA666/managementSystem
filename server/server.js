// !!! 发现如果要多次读取一个文件 不可用require  会有缓存 不会真的再去读取一遍
// 需要用fs.readFileSync() 每次都会再读取一遍
let express = require('express')
let body_parser = require('body-parser')
let app = express()
let fs = require('fs')
app.use(express.static('./'))  // 设置当前路径为静态资源根目录 即localhost:3000的位置

let multer = require('multer')
let storage = multer.diskStorage({  
    destination: function (req, file, cb) { // 上传的文件放在哪里
        cb(null, './uploads') // 要自己创建
    },
    filename: function (req, file, cb) { // 给上传的文件重命名
        // console.log(file.fieldname)// element-ui 默认为file 客户端form的input type='file' 的name值
        cb(null, file.fieldname + '-' + file.originalname)
    }
})

// 登陆
let login = '/admin/loginUser'
// 注册 
let register = '/admin/register'
// 菜单  /admin/menu/[public|grid|entry]
let menu = '/admin/menu/:name'

// 请求(省|市|区)地址
let address = '/admin/community/location/root'
// 请求用户信息列表(全)
let user_list = '/residents/list'
// 分页
let page = '/admin/getUserList'
// 邀请用户 -- 删除
let delInvitation = '/admin/delInvitation'
// 邀请用户 --添加备注
let addRemark = '/admin/addRemark'

app.use(body_parser.json())
app.all('*', function(req, res, next){  // 有点相当于app.use()/app.get() 等等  '/a' all 与use都可匹配到  '/a/b'  all无法匹配到 use可以  all需全部路径
    res.header("Access-Control-Allow-Origin", "*"); // !!!指定允许其他域名访问
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS'); // 响应类型
    res.header("Access-Control-Allow-Headers", "X-Requested-With");// 响应头设置
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // !!!

    next() // 不写则无法停止
})



// 图片上传
let uploadPath = '/user/upload'
var uploader = multer({storage: storage})
// uploader.single('file')  single 上传单文件(参一为客户端form的input type='file' 的name值)
// 一次上传一个
// app.post(uploadPath, uploader.single('file'), function(req, res) {
//     console.log(req.body)
//     req.file.success = 1
//     res.end(req.file.path)
// })

// 一次上传多个
app.post(uploadPath, uploader.array('file'), function(req, res) {
    res.end(JSON.stringify(req.files))
})


// 人员管理 --报名
app.post('/admin/signUpUser', (req, res) => {
    let arr = fs.readFileSync('./data/signUpList.json', {encoding: 'utf-8'})
    let signUpData = JSON.parse(arr)
    let lastId = signUpData.data[signUpData.data.length-1].id
    signUpData.data.push({
        id: +lastId + 1,
        userName: req.body.userName,
        userPhone: req.body.userPhone,
        remark: req.body.remark,
        signUpTime: req.body.signUpTime
    })
    
    fs.writeFileSync('./data/signUpList.json', JSON.stringify(signUpData), {encoding: 'utf-8'})
    res.end('上传成功')
})

// 人员管理 --删除
app.post('/admin/signUpDel', (req, res) => {
    let arr = fs.readFileSync('./data/signUpList.json', {encoding: 'utf-8'})
    let signUpData = JSON.parse(arr)
    signUpData.data.reverse() // 会改变原数组  无返回值  
    signUpData.data.map((v, k) => {
        if(v.id === req.body.id){
            signUpData.data.splice(k, 1)
        }
    })
    
    let begin = (req.body.currentPage-1) * req.body.count
    let newArr = signUpData.data.slice(begin, begin + req.body.count)
    let obj = {
        newArr: newArr,
        data: signUpData
    }
    
    signUpData.data.reverse()
    fs.writeFileSync('./data/signUpList.json', JSON.stringify(signUpData), {encoding: 'utf-8'})

    res.end(JSON.stringify(obj))
})

// 人员管理 --报名人员名单
app.post('/admin/signUpList', (req, res) => {
    let signUpData = fs.readFileSync('./data/signUpList.json', {encoding: 'utf-8'})
    let arr = JSON.parse(signUpData)
    arr.data.reverse()
    let begin = (req.body.currentPage-1) * req.body.count
    let newArr = arr.data.slice(begin, begin + req.body.count)
    let obj = {
        newArr: newArr,
        data: arr
    }
    res.end(JSON.stringify(obj))
})

// 保存并发布  --- 活动介绍页
app.post('/admin/savePre', (req, res) => {
    let brr = JSON.parse(fs.readFileSync('./data/savePre.json', {encoding: 'utf-8'}))
    brr.push(req.body)
    fs.writeFileSync('./data/savePre.json', JSON.stringify(brr))
    let obj ={
        msg: '保存成功',
        data: JSON.parse(fs.readFileSync('./data/savePre.json', {encoding: 'utf-8'}))
    } 
    console.log('success')
    res.end(JSON.stringify(obj))
})

// 活动展示

app.post('/admin/carousel', (req, res) => {
    let savePreData = fs.readFileSync('./data/savePre.json', {encoding: 'utf-8'})
    res.end(savePreData)
})

app.post(addRemark, (req, res) => {
    let user_list = require('./data/user_list.json')
    user_list.data.data.map((v, k) => {
        if(v.id == req.body.id){
            v.remark = req.body.remark
        }
    })
    fs.writeFileSync('./data/user_list.json', JSON.stringify(user_list))
    const pageData = user_list.data.data
    let begin = (req.body.pageSize-1) * req.body.count
    let newArr = pageData.slice(begin, begin + req.body.count)
    res.end(JSON.stringify(newArr)) 
})

let delInvitationFn = require('./api/delInvitation')
app.post('/admin/delInvitation', delInvitationFn)

app.post('/admin/getUserList', (req, res) => {
    const pageData = require('./data/user_list.json').data.data
    // 1   0-9     0-10
    // 2   10-19   10-20
    // 3   20-29
    let begin = (req.body.pageSize-1) * req.body.count
    let newArr = pageData.slice(begin, begin + req.body.count)
    res.end(JSON.stringify(newArr))
})

let residents = require('./api/residents')
app.get(user_list, residents)

const addrApi = require('./data/address.json')
app.get(address, function(req, res){
    res.writeHead(200, {
        'Content-Type': 'application/json;charset=utf-8'
    })
    res.end(JSON.stringify(addrApi))
})


const loginFn = require('./api/loginFn')
app.post(login, loginFn)

const registerFn = require('./api/registerFn')
app.post(register, registerFn)

app.post(menu, function(req, res){
    let name = req.params.name
    let arr = require('./data/'+name+'.json')
    res.end(JSON.stringify(arr))
})

app.listen(3000, function (data) {
    console.log('server listen 3000')
})