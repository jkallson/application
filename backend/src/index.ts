import app from './app';
import express, {Request, Response} from "express";

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});
