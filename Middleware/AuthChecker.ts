import {Request, Response, NextFunction} from 'express'

const SKIP_AUTHORIZATION_PATH = [{method: 'GET', url: '/presigned/**'}]
const API_KEY = 'api_key'

const urlComparison = (urlA, urlB) => {
    const urlAList = urlA.split('/')
    const urlBList = urlB.split('/')
    return urlAList.every((url, index) => {
        if(url === '**') return true
        return url === urlBList[index]
    })
}

export default (req: Request, res: Response, next: NextFunction) => {
    if (SKIP_AUTHORIZATION_PATH.find(path => path.method === req.method && urlComparison(path.url, req.originalUrl.split('?')[0]))) {
        next()
    } else {
        const authorization = req.header('Authorization')
        if (authorization !== API_KEY) return res.status(401).send('Unauthorized')
        next()
    }
}
