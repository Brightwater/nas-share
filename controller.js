import {Pg} from "./pgDao.js"
import {FileIO} from "./services/fileIO.js"

const pg = new Pg()
const fileIO = new FileIO()

export class Controller {
    hello(req, res) {
        res.send("hello")
    }

    async backEndCheck(req, res) {
        let data = pg.getAppData()
        if (await data == null) {
            res.send("-1")
        } else if (await data.userStoragePaths === null) {  
            res.send("1")
        } else {
            // data = JSON.parse(await data)
           
            // console.log("s")
            // let p = await data
            // console.log(await p.userStoragePath)
            res.send(await data)
            
        }
    }

    async readProperties(req, res) {
        let data = await fileIO.getAppData()
        console.log(data)
        res.send("1")
    }

    async addUserStoragePath(req, res) {
        let data = await fileIO.getAppData()
        if (data.userStoragePath.includes("/test/heere")) {
            res.send(false)
        }
        else {
            try {
                let files = await fileIO.getDirFiles("/home/jeremiah/development/nas-share/tempStore")
                console.log(files)
                if (files === null) {
                    throw error;
                }
                data.userStoragePath.push("/test/here")
                await fileIO.setAppData(data)
                console.log(data)
                res.send(true)
            } catch (err) {
                console.log("dir not found")
                res.send(false)
            }
            
        }
    }

    async getFilesInDir(req, res) {
        fileIO.getDirFiles("/home/jeremiah/development/nas-share/dfff")
        res.send(true)
    }

    // async writeProperties(req, res) {
        
    //     let data = await fileIO.setAppData("1")
    //     console.log(data)
    //     res.send("1")
    // }

    async setUserProps(req, res) {
        let path = req.body.userStoragePaths
        let port = req.body.port
        console.log(req.body)
        
        let data = await pg.setUserProps(path, port)
        if (await data != null) {
            res.send("1")
        }
        else {
            res.send("-1")
        }
    }

    async getFiles(req, res) {
        await fileIO.reader()
        res.send("1")
    }
} 

