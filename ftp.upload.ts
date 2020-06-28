/*
 * @Author: wangshenzhao
 * @Date: 2020-06-28 14:44:46
 * @LastEditors: wangshenzhao
 * @LastEditTime: 2020-06-28 14:55:38
 * @Description: 
 */
import { basename, dirname, join } from 'path';
import { createReadStream } from 'fs';
const ftp = require("ftp");
const client = new ftp();
client.on('ready',()=>{
    
    console.log('ftp client is ready');
    });
    client.on('close',()=>{
    
    console.log('ftp client has close')
    });
    
    client.on('end',()=>{
    
    console.log('ftp client has end')
    
    });
    
    client.on('error',(err)=>{
    
    console.log('ftp client has an error : '+ JSON.stringify(err))
    
    });
    
    client.connect({
    
    host: "192.168.14.208",
    
    port: "21",
    
    user: "",
    
    password: "",
    
    keepalive : 1000
    
  });
   // 调用方式
//let ea, dir = await put("/public/mozart.mp3", '/BroadCastFile/mozart.mp3', client)
//console.log(ea, dir);

/**
 *
 *切换目录
 * @param {*} dirpath
 * @param {*} client
 * @returns
 */
function cwd(dirpath,client){

  return new Promise((resolve,reject)=>{
  
  client.cwd(dirpath,(err,dir)=>{
  
  resolve({err : err,dir : dir});
  
  })
  
  });
  
}
/**
 *
 *推送文件
 * @param {*} currentFile 本地文件
 * @param {*} targetFilePath 目标文件
 * @param {*} client
 * @returns
 */
async function put(currentFile, targetFilePath, client) {

  const dirpath = dirname(targetFilePath);
  
  const fileName = basename(targetFilePath);
  
  const rs = createReadStream(currentFile);
  
  let ea,dir = await cwd(dirpath,client);//此处应对err做处理
  
  if(ea){
  
  return Promise.resolve({err : ea});
  
  }
  
  return new Promise((resolve,reject)=>{
  
  client.put(rs,fileName,(err)=>{
  
  resolve({err : err});
  
  })
  
  });
  
  }