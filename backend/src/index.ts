import app from './app';
import express from "express";
import automatedGameRoute from "../src/routes/automatedGameRoute";
import {GameController} from "./controllers/gameController";
import {MessageController} from "./controllers/messageController";
import {ShopController} from "./controllers/shopController";

app.use(express.json());
app.post('/api/game/start', GameController.startGame);
app.get('/api/game/:gameId/reputation', GameController.getReputation);
app.get('/api/game/:gameId/messages', MessageController.getMessages);
app.post('/api/game/:gameId/messages/:messageId/solve', MessageController.solveMessage);
app.get('/api/game/:gameId/shop', ShopController.getItems);
app.post('/api/game/:gameId/shop/:itemId/purchase', ShopController.purchaseItem);
app.use("/api/auto-play", automatedGameRoute)
