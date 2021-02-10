import { Server } from '@overnightjs/core'
const http= require('http')
import TenantController from './API/Tenant/controller'
import EmployeeController from './API/Employee/controller'
import SMSController from './API/SMS/controller'
import TokenController from './API/PresignedURL/controller'
import DevelopmentController from './API/Development/controller'
import AuthChecker from './Middleware/AuthChecker'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'

class SampleServer extends Server {
    constructor() {
        super()

        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: true}))
        this.app.use(cors())

        super.addControllers([
            TenantController,
            EmployeeController,
            SMSController,
            TokenController,
            DevelopmentController
        ]/*,null, AuthChecker*/)
    }

    public start(port: number) {
        console.log('Listening port: ', port)
        http.createServer(this.app).listen(port)
    }
}

new SampleServer().start(Number(process.env.PORT || 5002))
