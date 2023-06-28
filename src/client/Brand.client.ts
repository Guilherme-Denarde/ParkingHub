import axios from 'axios';
import { Brand } from '@/model/Brand';

const API_URL = 'http://localhost:8080';

export class BrandService {
    public async getAllBrands(): Promise<Brand[]> {
        return axios.get<Brand[]>(`${API_URL}/brand`).then((response) => response.data);    
  }

    public async getBrandById(id: number): Promise<Brand> {
        return axios.get<Brand>(`${API_URL}/brands/${id}`).then((response) => response.data);
  }

    public async createBrand(brand: Brand): Promise<Brand> {
        return axios.post<Brand>(`${API_URL}/brands`, brand).then((response) => response.data);
  }

    public async updateBrand(brand: Brand): Promise<Brand> {
        return axios.put<Brand>(`${API_URL}/brands/${brand.id}`, brand).then((response) => response.data);
  }

    public async deleteBrand(id: number): Promise<void> {
        return axios.delete(`${API_URL}/brands/${id}`).then(() => {});
  }  
}
