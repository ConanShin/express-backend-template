import {Request, Response} from 'express'
import {Controller, Get, Post} from '@overnightjs/core'
import {Logger, Log} from '../../Decorators/Logger'
import authServerService from './service'

@Controller('auth-server')
class AuthServerController {
    @Logger
    @Get('ping')
    async pingAuthServer(req: Request, res: Response) {
        try {
            const response = await authServerService.ping()
            res.status(200).send(response.headers['set-cookie'][0].split(';')[0].split('=')[1])
        } catch (error) {
            Log.Error(error)
            res.status(500).send()
        }
    }
}

export default new AuthServerController()
