// Definindo o arquivo para centralização das rotas
import { Router } from "express";

// Rotas dos usuarios
import  createUsuario from "./usuario/create-usuario.route";
import  getUsuario from "./usuario/get-usuario.route";
import  updateUsuario from "./usuario/update-usuario.route";
import  deleteUsuario from "./usuario/delete-usuario.route";
import  loginUsuario from "./usuario/login-usuario.route";

// Rotas de pets
import  createPet from "../routes/pet/create-pet.route";
import  getPetById from "../routes/pet/get-pet.route";
import  getAllPet from "../routes/pet/get-all-pet.route";
import  deletePet from "../routes/pet/delete-pet.route";
import  updatePet from "../routes/pet/update-pet.route";

// Rotas para adocão
import  createAdocao from "./adocao/adoptPet.route";
import  getAdocaoById from "../routes/adocao/get-adocao-by-id.route";
import  listAdocoes from "../routes/adocao/list-adocoes.route";
import  deleteAdocao from "../routes/adocao/delete-adocao.route";
import  updateAdocao from "../routes/adocao/update-adocao.route";




const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World!");
});

// Rotas de usuarios
router.use("/usuario", createUsuario); // Criar um usuario
router.use("/usuario", getUsuario); // Obter um usuario
router.use("/usuario", updateUsuario); // Atualizar um usuario
router.use("/usuario", deleteUsuario); // Deletar um usuario
router.use("/usuario/login", loginUsuario); // Login de usuario

// Rotas pets
router.use("/pet", createPet); // Criar um pet
router.use("/pet", getPetById); // Pegar dados de um pet por ID
router.use("/pets", getAllPet); // Pegar todos os pets
router.use("/pet", deletePet); // Deletar um pet
router.use("/pet", updatePet); // Atualizar um pet

// Rotas para adocão
router.use("/adocao", createAdocao); // Criar uma adocão
router.use("/adocao", getAdocaoById); // Obter adocão pelo ID
router.use("/adocoes", listAdocoes); // Obter todas as adocões
router.use("/adocao", deleteAdocao); // Deletar uma adocão
router.use("/adocao", updateAdocao); // Atualizar uma adocão

export default router;
