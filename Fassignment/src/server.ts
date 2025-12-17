import express, { Express } from "express";
import cors from 'cors';
import {config as DotEnv} from 'dotenv';
import { databaseConnection, config } from "./config";
import { mainApp } from "./routes";
DotEnv();

const app: Express = express();
app.use(cors());
app.use(express.json());

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