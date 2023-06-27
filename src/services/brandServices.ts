// import axios from 'axios';

// const API_URL = 'http://localhost:3001'; // The URL where your backend server is running, adjust if necessary

// export const brandService = {
//     async createBrand(name: string): Promise<any> {
//         try {
//             const response = await axios.post(`${API_URL}/brands`, { name });
//             return response.data;
//         } catch (error) {
//             console.error('Error creating brand:', error);
//             throw error;
//         }
//     },

//     async getBrands(): Promise<any> {
//         try {
//             const response = await axios.get(`${API_URL}/brands`);
//             return response.data;
//         } catch (error) {
//             console.error('Error fetching brands:', error);
//             throw error;
//         }
//     }
// };
import axios from 'axios';
import { Brand } from '@/model/Brand';

const API_URL = 'http://localhost:8080';

export class BrandService {
  getAllBrands(): Promise<Brand[]> {
    return axios.get<Brand[]>(`${API_URL}/brands`).then((response) => response.data);
  }

  getBrandById(id: number): Promise<Brand> {
    return axios.get<Brand>(`${API_URL}/brands/${id}`).then((response) => response.data);
  }

  createBrand(brand: Brand): Promise<Brand> {
    return axios.post<Brand>(`${API_URL}/brands`, brand).then((response) => response.data);
  }

  updateBrand(brand: Brand): Promise<Brand> {
    return axios.put<Brand>(`${API_URL}/brands/${brand.id}`, brand).then((response) => response.data);
  }

  deleteBrand(id: number): Promise<void> {
    return axios.delete(`${API_URL}/brands/${id}`).then(() => {});
  }  
}
