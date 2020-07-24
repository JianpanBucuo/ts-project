console.log('111')
const fs = require('fs')
const path = require('path')
// console.log(fs.readdirSync(__dirname))
// fs.readdirSync(__dirname).reduce((entry, dir) => {
//   console.log(  entry)
//   console.log('dir', dir)      
// //   const 
// console.log(entry + dir)
// })
var a = [{a:1},{b:2},{c:3},{d:4}]
a.reduce((a,b) => {
    for(let i in b) {
        a[i] = b[i]
    }    
    console.log(a)
    return a
},{})