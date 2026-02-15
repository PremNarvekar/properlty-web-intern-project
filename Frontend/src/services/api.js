import axios from 'axios';

const API_URL = '/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getSettings = async () => {
    const response = await api.get('/settings');
    return response.data;
};

export const updateSettings = async (settings) => {
    const response = await api.put('/settings', settings);
    return response.data;
};

export const getProperties = async () => {
    const response = await api.get('/properties');
    return response.data;
};

export const getProperty = async (id) => {
    const response = await api.get(`/property/${id}`);
    return response.data;
};

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const register_admin = async (credentials) => {
    const response = await api.post('/auth/register', credentials);
    return response.data;
};

export const createProperty = async (formData) => {
    const response = await api.post('/admin/property', formData);
    return response.data;
};

export const updateProperty = async (id, data) => {
    const response = await api.put(`/admin/property/${id}`, data);
    return response.data;
};

export const deleteProperty = async (id) => {
    const response = await api.delete(`/admin/property/${id}`);
    return response.data;
};
