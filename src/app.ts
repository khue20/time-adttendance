import 'module-alias/register'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import expressHandlebars from 'express-handlebars'
import http from 'http'
import { Request, Response } from 'express'
import fs from 'fs'
import passport from './plugins/passport'
import path from 'path'
import moduleAlias from "module-alias"
const isProd: any = process.env.IS_PRODUCTION === 'production' && true
if (isProd) {
    moduleAlias.addAliases({
        "@": path.join(__dirname, '/../dist')
    })
} else {
    moduleAlias.addAliases({
        "@": path.join(__dirname, '/../src')
    })
}
import Mongo from './plugins/mongoose'
//calculate between date

// import moment from 'moment'
// const d1: any = new Date("12/09/2021")
// const d2: any = new Date("12/16/2021")
// const date1: any = moment(d1).locale('lo').format('YYYY-MM-DD')
// const date2: any = moment(d2).locale('lo').format('YYYY-MM-DD')
// if (date1 === date2) {
//     console.log(1)
// } else {
//     const oneDay = 1000 * 3600 * 24;
//     const diffInTime = Math.abs(d2.getTime() - d1.getTime())
//     const diffInDays = Math.ceil(diffInTime / oneDay);
//     console.log(diffInDays)
// }

class App {
    static readonly PORT: number | string = process.env.PORT || 5000
    #app!: express.Application
    #httpServer!: http.Server
    #cors!: any
    #Mongo!: Mongo
    #jsonParser!: any
    #urlencodedParser!: any
    #dotenv!: any
    #port!: string | number
    #expressHandlebars: any


    //  #corsOptions!: any

    constructor() {
        this.initialize()
        this.createApp()
        this.middleware()
        this.createPage()
        this.createRouter()
        this.createServer()
        this.listen()
    }

    private initialize(): void {
        this.#app = express()
        this.#cors = cors
        this.#Mongo = new Mongo()
        this.#jsonParser = bodyParser.json({ limit: '50mb' })
        this.#urlencodedParser = bodyParser.urlencoded({ limit: '50mb', extended: false })


        this.#dotenv = dotenv
        this.#port = App.PORT
        this.#expressHandlebars = expressHandlebars
    }

    private createApp(): void {
        this.#dotenv.config({ path: '.env' })
        this.#Mongo.connect()
    }

    private middleware(): void {
        this.#app.use(this.#cors())
        this.#app.use(this.#jsonParser)
        this.#app.use(this.#urlencodedParser)
        //  this.#app.use(express.static('tmp'))
        // this.#app.use(express.static('public'))
        this.#app.use(express.static('public/main'))
        this.#app.engine('handlebars', this.#expressHandlebars())
        this.#app.set('view engine', 'handlebars')
        this.#app.use(passport.initialize())
    }

    private createPage(): void {
        this.#app.get('/admin-login', (req: Request, res: Response) => {
            res.render('admin-login', { layout: false })
        })
    }

    private createRouter(): void {
        const routePath = __dirname + '/client/apis/rest/routes/'
        fs.readdirSync(routePath).map((file: string) => {
            const route = './client/apis/rest/routes/' + file
            this.#app.use('/api', require(route).default)
        })
        const routePaths = __dirname + '/admin/apis/rest/routes/'
        fs.readdirSync(routePaths).map((file: string) => {
            const route = './admin/apis/rest/routes/' + file
            this.#app.use('/admin/api', require(route).default)
        })

        this.#app.get('*', (req: Request, res: Response) => {
            res.render('main', { layout: false })
        })
        this.#httpServer = http.createServer(this.#app)
        // this.#app.get('*', (req: Request, res: Response) => {
        //     res.status(404).json(404)
        // })
    }

    private createServer(): void {
        this.#httpServer = http.createServer(this.#app)
    }

    private listen(): void {
        this.#httpServer.listen(this.#port, () => {
            console.log('Http is runing at port: ' + this.#port)
        })
    }
}
// tslint:disable-next-line:no-unused-expression
new App()
