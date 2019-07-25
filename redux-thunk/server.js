const express=require('express')
var server=express()

server.get('/api', function (req, res) {
  res.send({ok: true, msg: 'get请求成功', data: ['hello', 'world']})
})

server.listen(8888)

