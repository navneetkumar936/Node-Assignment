import express, { Application, Router } from 'express';
import bodyParser from 'body-parser';
import companyRouter from './routers/company';
import teamRouter from './routers/team';
import userRouter from './routers/user';
import { sequelize } from './database';
import ErrorHandler from "./helper/errorHandler";
import logger from "./helper/logger";
import apiErrorHandler from "./helper/apiErrorHandler";

class Server {
    private app;

    constructor() {
        this.app = express();
        this.config();
        this.routerConfig();
        this.handleError();
        this.dbConnect();
    }

    private config() {
        this.app.use(bodyParser.urlencoded({ extended:true }));
        this.app.use(bodyParser.json({ limit: '1mb' })); // 100kb default
    }

    private dbConnect() {
        sequelize.sync({ alter: true }).then(() => {
            console.log(`Database & tables generated!`);
        }).catch((err) => {
            throw new Error(err);
        });
    }

    private routerConfig() {
        this.app.use('/v1/login', userRouter);
        this.app.use('/v1/company', companyRouter);
        this.app.use('/v1/team', teamRouter);
    }

    private handleError(){
        const errorHandler = new ErrorHandler({
			logMethod : logger,
			shouldLog: true,
		});
		this.app.use(apiErrorHandler);
		this.app.use(errorHandler.unhandledRequest());
    }

    public start = (port: number) => {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                resolve(port);
            }).on('error', (err: Object) => reject(err));
        });
    }
}

export default Server;