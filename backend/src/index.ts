import app from './app';
import express from "express";
import automatedGameRoute from "../src/routes/automatedGameRoute";
import {GameController} from "./controllers/gameController";
import {MessageController} from "./controllers/messageController";

app.use(express.json());
app.post('/api/game/start', GameController.startGame);
app.get('/api/game/messages/:gameId', MessageController.getMessages);
app.post('/api/game/messages/:gameId/solve/:messageId', MessageController.solveMessage);
app.use("/api/auto-play", automatedGameRoute)
