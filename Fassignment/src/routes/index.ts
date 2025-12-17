import express, { Express, Router } from "express";
import { userRoutes } from "./UserRoutes";
import { config } from "../config";

const routes: Router[] = [userRoutes];
const mainApp: Express = express()
mainApp.use(config.prefix, routes);

export {mainApp}