import express from 'express';
import dotenv from 'dotenv';
import confissoesRoutes from "./src/routes/confissoesRoutes.js";
import usuariosRoutes from "./src/routes/usuariosRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Servidor online!");
});

app.use("/confissoes", confissoesRoutes);
app.use("/usuarios", usuariosRoutes);

app.listen(serverPort, () => {
    console.log(`-- Servidor aberto em: http://localhost:${serverPort}`);
});