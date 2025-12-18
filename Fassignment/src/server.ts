import {config as DotEnv} from 'dotenv';
DotEnv();
import { swaggerDocs } from "./swagger";
import express, { Express } from "express";
import cors from 'cors';
import { databaseConnection, config } from "./config";
import { mainApp } from "./routes";

const app: Express = express();
app.use(cors());
app.use(express.json());
swaggerDocs(app);
app.use(mainApp);

const startServer = async () => {
    try {
        databaseConnection();
        await app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        })
    } catch (error) {
        console.error('Server not started because DB failed');
        process.exit(1)
    }
}

startServer();