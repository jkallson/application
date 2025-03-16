import express, {Express} from 'express';
import 'dotenv/config'
import cors from "cors";

const app: Express = express();
app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
}));
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

export default app;
