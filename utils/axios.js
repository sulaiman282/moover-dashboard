import axios from "axios";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});


const TokenGettingtoken = async () => {
  const cookieName = "token";
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + "=")) {
      const token = cookie.substring(cookieName.length + 1);
      return token;
      break;
    }
  }
  return null;
};


api.interceptors.request.use(
  async (config) => {
    const token1 = await TokenGettingtoken();
   
    if (token1?.length > 0) {
      config.headers.Authorization = `Bearer ${token1}`;
    } 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
