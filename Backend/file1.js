const fs = require('fs')
const path = require('path')

const UserDataFile = path.join(__dirname, 'Users.json');

const readUserDataFile = ()=>{
    if(!fs.existsSync(UserDataFile)){
        fs.writeFileSync(UserDataFile,JSON.stringify([]))
    }
    return JSON.parse(fs.readFileSync(UserDataFile,'utf-8'))
}

const writeUserDataFile = (data)=>{
    fs.writeFileSync(UserDataFile,JSON.stringify(data,null,2))
}

module.exports = {readUserDataFile, writeUserDataFile}