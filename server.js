import express from 'express';
import dotenv from 'dotenv';
import confissaoRoutes from "./src/routes/confissaoRoutes.js";
import usersRoutes from "./src/routes/usersRoutes.js"

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Servidor online!");
});

app.use("/confissoes", confissaoRoutes);
app.use("/usuarios", usersRoutes)

app.listen(serverPort, () => {
    console.log(`-- Servidor aberto em: http://localhost:${serverPort}`);
});