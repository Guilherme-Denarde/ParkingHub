import axios from 'axios';

const API_URL = 'http://localhost:3001'; // The URL where your backend server is running, adjust if necessary

export const brandService = {
    async createBrand(name: string): Promise<any> {
        try {
            const response = await axios.post(`${API_URL}/brands`, { name });
            return response.data;
        } catch (error) {
            console.error('Error creating brand:', error);
            throw error;
        }
    },

    async getBrands(): Promise<any> {
        try {
            const response = await axios.get(`${API_URL}/brands`);
            return response.data;
        } catch (error) {
            console.error('Error fetching brands:', error);
            throw error;
        }
    }
};
