import express, { Express, Router } from "express";
import { userRoutes } from "./UserRoutes";
import { authRoutes } from "./AuthRoutes";
import { config } from "../config";

const routes: Router[] = [userRoutes, authRoutes];
const mainApp: Express = express()
mainApp.use(config.prefix, routes);

export {mainApp}