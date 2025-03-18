// doing this just for simplification - in reality i would just have env file
export const appConfiguration: { apiUrl: string } = {
    apiUrl: process.env.API_BASE_URL || 'https://dragonsofmugloar.com/api/v2'
}
