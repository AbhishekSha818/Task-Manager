import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, TOKEN_KEY } from '../constants/config';
import { AuthResponse, Task } from '../types';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: async (email: string, username: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', { email, username, password });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

export const taskService = {
  getTasks: async (status?: string): Promise<Task[]> => {
    const response = await api.get('/tasks', { params: { status } });
    return response.data;
  },

  getTask: async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (title: string, description?: string): Promise<Task> => {
    const response = await api.post('/tasks', { title, description, status: 'Pending' });
    return response.data;
  },

  updateTask: async (id: string, title: string, description?: string, status?: string): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, { title, description, status });
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
