// 获取cookie
function getCookie(target) {
    let cookie = document.cookie
    let str
    cookie.split(';').map((v, k) => {
        let val = v.split('=')
        if(val[0] === target ){
            str = val[1]
        }
    })
    return str
}
// 设置cookie 
function setCookie (key, value) {
    if (!key || !value) return
    document.cookie = key + '=' + value
}
// 删除cookie
function delCookie(name){
    let exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = getCookie(name)
    if(cval != null){
        document.cookie = name + '=' + cval + ';expires='+exp.toGMTString()
    }
}
export {
    getCookie,
    setCookie,
    delCookie
}