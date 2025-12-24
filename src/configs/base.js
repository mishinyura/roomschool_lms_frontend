const VITE_API_BASE_URL = 'http://localhost:8000'
const BASE_URL = 'https://roomschool.ru'
const LK_URL = 'http://localhost:8081'
const VITE_API_KEY = 'mykey'

export class Config {
    static BASE_URL = BASE_URL
    static LK_URL = LK_URL
    static API_BASE_URL = VITE_API_BASE_URL
    static API_KEY = VITE_API_KEY
    static ENDPOINTS = {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        FORGOT: '/auth/forgot',
    }
    static API_ENDPOINTS = {
        CHECK_AUTH: `${VITE_API_BASE_URL}/auth`,
        LOGIN: `${VITE_API_BASE_URL}/auth/login`,
        LOGOUT: `${VITE_API_BASE_URL}/auth/logout`,
        FORGOT: `${VITE_API_BASE_URL}/auth/forgot`,
    }
}