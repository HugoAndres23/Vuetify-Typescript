import axios from 'axios'
import {
    UserProfile, UserProfileUpdate, UserProfileCreate
} from './interfaces'

function authHeaders (token: string) {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

const apiUrl = 'localhost:8181'

export const api = {
    async logInGetToken (username: string, password: string) {
        const params = new URLSearchParams()
        params.append('username', username)
        params.append('password', password)

        return axios.post(`${apiUrl}/login/access-token`, params)
    },
    async getMe (token: string) {
        return axios.get<UserProfile>(`${apiUrl}/users/me`, authHeaders(token))
    },
    async updateMe (token: string, data: UserProfileUpdate) {
        return axios.put<UserProfile>(`${apiUrl}/users/me`, data, authHeaders(token))
    },
    async getUsers (token: string) {
        return axios.get<UserProfile[]>(`${apiUrl}/users/`, authHeaders(token))
    },
    async updateUser (token: string, userId: number, data: UserProfileUpdate) {
        return axios.put(`${apiUrl}/users/${userId}`, data, authHeaders(token))
    },
    async createUser (token: string, data: UserProfileCreate) {
        return axios.post(`${apiUrl}/users/`, data, authHeaders(token))
    },
    async passwordRecovery (email: string) {
        return axios.post(`${apiUrl}/password-recovery/${email}`)
    }
}
