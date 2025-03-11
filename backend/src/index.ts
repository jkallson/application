import app from './app';
import express from "express";
import automatedGameRoute from "../src/routes/automatedGameRoute";
import {GameController} from "./controllers/gameController";
import {MessageController} from "./controllers/messageController";
import {ShopController} from "./controllers/shopController";

app.use(express.json());
app.post('/api/game/start', GameController.startGame);
app.get('/api/game/messages/:gameId', MessageController.getMessages);
app.post('/api/game/messages/:gameId/solve/:messageId', MessageController.solveMessage);
app.get('/api/game/shop/:gameId', ShopController.getItems);
app.post('/api/game/shop/:gameId/purchase/:itemId', ShopController.purchaseItem);
app.use("/api/auto-play", automatedGameRoute)
