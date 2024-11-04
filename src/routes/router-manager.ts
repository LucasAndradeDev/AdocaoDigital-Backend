// Definindo o arquivo para centralização das rotas
import { Router } from "express";

// Rotas dos adotantes
import  createAdotante from "../routes/adotante/create-adotante.route";
import  getAdotante from "../routes/adotante/get-adotante.route";
import  updateAdotante from "../routes/adotante/update-adotante.route";
import  deleteAdotante from "../routes/adotante/delete-adotante.route";
import  loginAdotante from "../routes/adotante/login-adotante.route";

// Rotas de pets
import  createPet from "../routes/pet/create-pet.route";
import  getPetById from "../routes/pet/get-pet.route";
import  getAllPet from "../routes/pet/get-all-pet.route";
import  deletePet from "../routes/pet/delete-pet.route";
import  updatePet from "../routes/pet/update-pet.route";

// Rotas para adocão
import  createAdocao from "../routes/adocao/create-adocao.route";
import  GetAdocaoById from "../routes/adocao/get-adocao-by-id.route.ts";
import  ListAdocoes from "../routes/adocao/list-adocoes.route.ts";
import  DeleteAdocao from "../routes/adocao/delete-adocao.route.ts";
import  UpdateAdocao from "../routes/adocao/update-adocao.route.ts";


const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World!");
});

// Rotas adotantes
router.use("/adotante", createAdotante); // Criar um adotante
router.use("/adotante", getAdotante); // Obter um adotante
router.use("/adotante", updateAdotante); // Atualizar um adotante
router.use("/adotante", deleteAdotante); // Deletar um adotante
router.use("/adotante/login", loginAdotante); // Login de adotante

// Rotas pets
router.use("/pet", createPet); // Criar um pet
router.use("/pet", getPetById); // Pegar dados de um pet por ID
router.use("/pets", getAllPet); // Pegar todos os pets
router.use("/pet", deletePet); // Deletar um pet
router.use("/pet", updatePet); // Atualizar um pet

// Rotas para adocão
router.use("/adocao", createAdocao);


export default router;
