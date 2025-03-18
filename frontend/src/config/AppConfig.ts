// doing this just for simplification - in reality i would just have env file
export const config: { apiUrl: string } = {
    apiUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
}
