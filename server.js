import express from 'express';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Servidor online");
});

app.listen(serverPort, () => {
    console.log(`-- Servidor aberto em: http://localhost:${serverPort}`);
});