import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL: "http://10.89.240.80:3000/api/reservas/v1",
  headers: {
    accept: "application/json",
  },
});

// Intercepta requisições para adicionar token e tratar erros
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      console.warn(
        "Erro 403 - Acesso negado. Token pode estar inválido ou expirado."
      );
    }
    return Promise.reject(error);
  }
);

const sheets = {
  postCadastro: (user) => api.post("/user/", user),
  postLogin: (user) => api.post("/user/login", user),
  getSalas: () => api.get("/classroom/"),
  getHorariosDisponiveisPorSalaEData: (fk_number, date) =>
    api.get(`/disponibilidade/${fk_number}/${date}`),
  postReserva: (reserva) => api.post("/schedules/", reserva),
  updateUser: (userId, user) => api.put(`/upusers/${userId}`, user),
  getMinhasReservas: (userId) => api.get(`/schedule/user/${userId}`),
  getUsuario: (userId) => api.get(`/user/${userId}`),
  deletarReserva: (id) => api.delete(`/schedules/${id}`),
  deleteUser: (userId) => api.delete(`/users/${userId}`),
  totalReservas: (userId) => api.post(`/total/reservas/usuario/${userId}`),
};

export default sheets;
