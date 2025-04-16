const fs = require('fs')
const path = require('path')

const UserDataFile = path.join(__dirname, 'Books.json');

const readBookDataFile = ()=>{
    if(!fs.existsSync(UserDataFile)){
        fs.writeFileSync(UserDataFile,JSON.stringify([]))
    }
    return JSON.parse(fs.readFileSync(UserDataFile,'utf-8'))
}

const writeBookDataFile = (data)=>{
    fs.writeFileSync(UserDataFile,JSON.stringify(data,null,2))
}

module.exports = {readBookDataFile, writeBookDataFile}