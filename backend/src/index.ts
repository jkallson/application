import app from './app';
import express from "express";
import automatedGameRoute from "../src/routes/automatedGameRoute";
import {GameController} from "./controllers/gameController";

app.use(express.json());
app.post('/api/game/start', GameController.startGame);
app.use("/api/auto-play", automatedGameRoute)
