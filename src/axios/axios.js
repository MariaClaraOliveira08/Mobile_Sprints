// Importa o módulo 'axios' para fazer requisições HTTP
import axios from "axios";
import CriarReserva from "../screens/ReservarSala";

// Cria uma instância do axios com uma configuração padrão
const api = axios.create({
  // Define a URL base para as requisições da API
  baseURL: "http://10.89.240.64:5000/api/reservas/v1",

  // Define os headers padrão para todas as requisições
  headers: {
    accept: "application/json", // Espera que a resposta da API seja no formato JSON
  },
});

// Cria um objeto 'sheets' que contém as funções para fazer as requisições específicas à API
const sheets = {
  postCadastro: (user) => api.post("/user/", user),
  postLogin: (user) => api.post("/user/login", user),
  getSalas: () => api.get("/classroom/"),
  getHorariosDisponiveisPorSalaEData: (fk_number, date) => 
  api.get(`/disponibilidade/${fk_number}/${date}`),
  postReserva: (reserva) => api.post("/schedule/", reserva),
};

// Exporta o objeto 'sheets' para que outras partes do código possam usá-lo
export default sheets;
