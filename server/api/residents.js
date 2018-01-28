const residents = require('../data/user_list.json')
module.exports = function(req, res){
    res.end(JSON.stringify(residents))
}