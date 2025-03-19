import axios from "axios";

const api = axios.create({
    baseURL: "http://10.89.240.80:5000/api/reservas/v1/",
    headers:{
        'accept':'application/json'
    }
});

const sheets = {
    postCadastro:(user)=>api.post("/user/", user),
    postLogin:(user)=>api.post("/user/login", user),
    getSalas:(classroom)=>api.get("/classroom/", classroom)
}
export default sheets;