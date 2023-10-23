import { defineStore } from 'pinia';
import axios from 'axios';
import type { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    userRole: null as string[] | null
  }),
  getters: {
    currentUserName(): string {
      return '';
    },
    isAdmin(): boolean {
      return this.userRole?.includes('ROLE_ADMIN') || false;
    }
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await apiClient.post('/api/v1/auth/authenticate', {
          username: email,
          password: password
        });
        console.log('Login response:', response);
        this.token = response.data.access_token;
        this.userRole = response.data.user_role;
        localStorage.setItem('access_token', this.token as string);
        localStorage.setItem('user_role', JSON.stringify(this.userRole));
        return response;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    logout() {
      console.log('logout');
      this.token = null;
      this.userRole = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_role');
    },
    reload(token: string, userRole: string[]) {
      this.token = token;
      this.userRole = userRole;
    },
    async register(firstName: string, lastName: string,email: string, username: string, password: string) {
      try {
        const response = await apiClient.post('/api/v1/auth/register', {
          firstname: firstName,
          lastname: lastName,
          email: email,
          username: username,
          password: password,
        });
        console.log('Registration response:', response);
        // Assuming the response contains the access token and user role
        this.token = response.data.access_token;
        this.userRole = response.data.user_role;
        localStorage.setItem('access_token', this.token as string);
        localStorage.setItem('user_role', JSON.stringify(this.userRole));
        return response;
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },
    async advisorRegister(firstName:string,lastName:string, email:string, username:string, password:string) {
      try {
        const response = await apiClient.post('/api/v1/auth/advisor/register', {
          firstname: firstName,
          lastname: lastName,
          email: email,
          username: username,
          password: password,
        });
        console.log('Advisor Registration response:', response);
        // Assuming the response contains the access token and user role
        this.token = response.data.access_token;
        this.userRole = response.data.user_role;
        localStorage.setItem('access_token', this.token as string);
        localStorage.setItem('user_role', JSON.stringify(this.userRole));
        return response;
      } catch (error) {
        console.error('Advisor Registration error:', error);
        throw error;
      }
    }
    
  }
});
