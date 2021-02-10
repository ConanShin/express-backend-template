import { Server } from '@overnightjs/core'
const http= require('http')
import AuthServerController from './API/AuthServer/controller'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'

class SampleServer extends Server {
    constructor() {
        super()

        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: true}))
        this.app.use(cors())

        super.addControllers([
            AuthServerController,
        ]/*,null, AuthChecker*/)
    }

    public start(port: number) {
        console.log('Listening port: ', port)
        http.createServer(this.app).listen(port)
    }
}

new SampleServer().start(Number(process.env.PORT || 5002))
