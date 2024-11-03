// Definindo o arquivo para centralização das rotas
import { Router } from "express";

// Rotas dos adotantes
import  createAdotante from "../routes/adotante/create-adotante.route";
import  getAdotante from "../routes/adotante/get-adotante.route";
import  updateAdotante from "../routes/adotante/update-adotante.route";
import  deleteAdotante from "../routes/adotante/delete-adotante.route";

// As rotas dos pets serão implementadas futuramente

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.use("/adotante", createAdotante); // Criar um adotante
router.use("/adotante", getAdotante); // Obter um adotante
router.use("/adotante", updateAdotante); // Atualizar um adotante
router.use("/adotante", deleteAdotante); // Deletar um adotante

export default router;