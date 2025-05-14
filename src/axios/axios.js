// Importa o módulo 'axios' para fazer requisições HTTP
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import CriarReserva from "../screens/ReservarSala";

// Cria uma instância do axios com uma configuração padrão
const api = axios.create({
  // Define a URL base para as requisições da API
  baseURL: "http://10.89.240.80:5000/api/reservas/v1",

  // Define os headers padrão para todas as requisições
  headers: {
    accept: "application/json", 
  },
});

api.interceptors.request.use(
  async (config) => {
    //aguardando o token ser recuperado
    const token = await SecureStore.getItemAsync("token"); 
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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
