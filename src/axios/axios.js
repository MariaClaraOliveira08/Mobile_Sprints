// Importa o módulo 'axios' para fazer requisições HTTP
import axios from "axios";

// Cria uma instância do axios com uma configuração padrão
const api = axios.create({
    // Define a URL base para as requisições da API
    baseURL: "http://10.89.240.64:5000/api/reservas/v1",
    
    // Define os headers padrão para todas as requisições
    headers:{
        'accept':'application/json'  // Espera que a resposta da API seja no formato JSON
    }
});

// Cria um objeto 'sheets' que contém as funções para fazer as requisições específicas à API
const sheets = {
    // Função para realizar o cadastro de um novo usuário
    postCadastro:(user)=>api.post("/user/", user),  
    
    // Função para realizar o login de um usuário
    postLogin:(user)=>api.post("/user/login", user),  
    
    // Função para obter as informações sobre as salas
    getSalas:()=>api.get("/classroom/"),
    getSalasSemReservas: () => api.get('/disponibilidade/'),
}

// Exporta o objeto 'sheets' para que outras partes do código possam usá-lo
export default sheets;