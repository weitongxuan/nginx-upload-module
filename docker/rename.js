const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk; // 获取form-data
  });
  req.on('end', () => {
    console.log(body);
    const params = parseForm(body); // json化参数
    rename(params.file_path, params.file_name);
    res.end('success: you can get it from: /' + params.file_name);
  })
}).listen(8080)

function parseForm(data) {
  const reg = /name="([\w_]+)"\s+(.+)\s/g;
  const params = {};
  let matched;
  while((matched = reg.exec(data))){
    params[matched[1]] = matched[2];
  }
  console.log(params);
  return params;
}

function rename(source, name){
  const path = require('path');
  const dir = path.dirname(source);
  fs.renameSync(source, path.join(dir, name));
}