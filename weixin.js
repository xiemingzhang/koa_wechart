'use strict'

exports.reply = function*(next) {
    var message = this.weixin

    if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            if (message.EventKey) {
                console.log('扫描二维码进来：' + message.EventKey + ' ' + message.ticket)
                this.body = '扫描二维码进来：' + message.EventKey + ' ' + message.ticket
            }
            this.body = '哈哈，欢迎回来！\r\n' + '消息ID' + message.MsgId
        } else if (message.Event === 'unsubscribe') {
            console.log(message.MsgId + '期待下次')
            this.body = '期待下次'
        } else if (message.Event === 'LOCATION') {
            this.body = '您上报的位置是' + message.Latitude + '/' + message.Longitude + '-' + message.Precision
        } else if (message.Event === 'CLICK') {
            this.body = '您点击了菜单:' + message.EventKey
        } else if (message.Event === 'SCAN') {
            console.log('关注后扫二维码' + message.EventKey + '' + message.Ticket)
            this.body = '您扫描二维码成功'
        } else if (message.Event == 'VIEW') {
            this.body = '您点击了菜单中的链接' + message.EventKey
        }
    } else if (message.MsgType === 'text') {
        var content = message.Content
        var reply = '你说的' + content + '太复杂了!'
        if (content === '1') {
            reply = '你拍1'
        } else if (content === '2') {
            reply = '你拍2'
        } else if (content === '3') {
            reply = '不玩了'
        } else if (content === '4') {
            reply = [{
                title: 'node开发微信',
                descreption: '只是描述而已',
                picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509424384671&di=f70b7b8b41f7c0a6dca7229294f10a94&imgtype=0&src=http%3A%2F%2Fimg1a.xgo-img.com.cn%2Fpics%2F1545%2Fa1544726.jpg',
                url: 'http://nodejs.cn/api/'
            }]
        }
        this.body = reply
    }
    yield next
}