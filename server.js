//importação de tudo que é usado
import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import confissoesRoutes from "./src/routes/confissoesRoutes.js";
import usuariosRoutes from "./src/routes/usuariosRoutes.js";

//configurações básicas
const app = express();


app.use(express.json());
app.use(cors());

dotenv.config();
const serverPort = process.env.PORT;

//rotas
app.get('/', (req, res) => {
    res.send("Servidor online!");
});

app.use("/confissoes", confissoesRoutes);
app.use("/usuarios", usuariosRoutes);

app.listen(serverPort, () => {
    console.log(`-- Servidor aberto em: http://localhost:${serverPort}`);
});