import app from './app';
import express from "express";
import automatedGameRoute from "../src/routes/automatedGameRoute";

app.use(express.json());
app.use("/api/auto-play", automatedGameRoute)
