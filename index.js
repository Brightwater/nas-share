import express from 'express'
import {Controller} from "./controller.js"
import bodyParser from 'body-parser'


const PORT = 3011
const app = express()

const controller = new Controller()

app.listen(PORT, () =>
  console.log(`Backend app running on: http://localhost:${PORT}.`)
)

app.use(express.json())



// routes

app.get('/readProperties', (request, response) => {
    controller.readProperties(request, response)
}) 

app.get('/addUserStoragePath', (request, response) => {
    controller.addUserStoragePath(request, response)
}) 
app.get('/getFiles', (request, response) => {
    controller.getFilesInDir(request, response)
}) 

app.get('/hello', (request, response) => {
    controller.hello(request, response)
})

app.post('/setUserProps', (req, res) => {
    controller.setUserProps(req,res)
})

app.get('/files', (req, res) => {
    controller.getFiles(req,res)
})