import express, { Express, Router } from "express";
import { userRoutes } from "./UserRoutes";
import { authRoutes } from "./AuthRoutes";
import { attendRouter } from "./AttendanceRoutes";
import { LeaveRouter } from "./ReaveRoutes";
import { config } from "../config";

const routes: Router[] = [userRoutes, authRoutes, attendRouter, LeaveRouter];
const mainApp: Express = express()
mainApp.use(config.prefix, routes);

export {mainApp}