import fs from 'fs';
import {Pg} from "../pgDao.js"
import * as path from 'path'

const pg = new Pg()

const timeout = 
    seconds => new Promise(res => setTimeout(res, seconds * 1000));

function myAPICall() {
  // simulate 1 second wait time
  return timeout(4).then(() => 'success');
}

export class FileIO {
    async reader() {
        console.log("Ggeeb")     
        let data = await pg.getAppData()
        console.log(data)
        // for (file of data.userStoragePaths) {
        //     console.log(file)
        // }
        
        // if (await data !== null) {
            
        //     let p = path.join(await data.userStoragePath)
        //     fs.readdir(p, (err, files) => {
        //         if (err) {
        //             throw err
        //         }
        //         files.forEach(() => {
        //             console.log(file)
        //         })
        //     })
        // }
    }

    async getDirFiles(path) {
        // let p = path.join(path)
        let files = await fs.promises.readdir(path)
        
        return files
    }

    async getAppData() {
        let d = await fs.promises.readFile("./properties.json", "utf-8")
        return JSON.parse(d)
    }

    async setAppData(data) {
        let d = await fs.promises.writeFile("./properties.json", JSON.stringify(data), {encoding: "utf-8", flag: "w"})
        return true
    }
}