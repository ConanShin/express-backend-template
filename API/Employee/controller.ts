import {Request, Response} from 'express'
import {Controller, Get, Post} from '@overnightjs/core'
import {Logger, Log} from '../../Decorators/Logger'
import employeeService from './service'

@Controller('employee')
class EmployeeController {
    @Logger
    @Get()
    async findEmployee(req: Request, res: Response) {
        const {tenantId, serialNumber} = req.query
        if (!tenantId) return res.status(200).send('구성원의 조직정보(tenantId)는 필수 값 입니다.')

        try {
            const memberList = await employeeService.getEmployees(tenantId)
            res.status(200).json(memberList)
        } catch (error) {
            Log.Error(error)
            res.status(500)
        }
    }
}

export default new EmployeeController()
