var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号\nnode server.js 8888 就像这样？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  console.log('查询字符串的路径\n' + pathWithQuery)

  if(path === '/'){
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('<!DOCTYPE><html><head>'+
    '<link rel="stylesheet" href="/style.css">'
    +'</head><body><h1>你好</h1></body><script src="/main.js"></script></html>')
    response.end()
  }else if(path === '/style.css'){
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write('body{background-color: skyblue}')
    response.end()
  }else if(path === '/main.js') {
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write('alert(10)')
    response.end()
  }else {
    response.statusCode = 404
    response.end()
  }
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请打开 http://localhost:' + port)


