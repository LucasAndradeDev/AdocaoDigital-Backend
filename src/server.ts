//Criação do server
import express from 'express';
import cors from 'cors';
import router from './routes/router-manager';

// Configurando o server
const app = express(); 
app.use(cors());
app.use(express.json());
app.use(router);

//Iniciação do server
const PORT = 3030;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
    console.log('Error starting server:', err);
});

export default app;