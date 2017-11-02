'use strict'

var path = require('path');
var util = require('./libs/util');
var wechat_file = path.join(__dirname,'./config/wechat.txt');
var config = {
    wechat:{
        appID:'wxf99f0971431c1465',
        appSecret:'96ffd639ac7c24c110b08d43fd7a60b0',
        token:'webxie',
        getAccessToken: function(){
        	return util.readFileAsync(wechat_file)
        },
        saveAccessToken: function(data){
        	var data = JSON.stringify(data)
        	return util.writeFileAsync(wechat_file,data)
        }
    }
}

module.exports = config