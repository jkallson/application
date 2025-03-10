import express from 'express';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

export default app;
