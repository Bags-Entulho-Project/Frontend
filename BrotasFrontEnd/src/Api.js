const pathsWithoutJwt = [
  "login",
]
export const API = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
})
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (pathsWithoutJwt.includes(window.location.pathname.split("/")[1])) {
      return Promise.reject(error)
    }
    const originalRequest = error.config
    if (
      error.response.status === 401 ||
      (error.response.status === 403 && !originalRequest._retry)
    ) {
      originalRequest._retry = true
      try {
        await axios.post("http://localhost:8080/api/auth/refresh", null, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
        return API(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
)