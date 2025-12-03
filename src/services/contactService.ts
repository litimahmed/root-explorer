import { apiClient } from './api';
import { ContactData } from '@/types/contact';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const contactService = {
  async getContactInfo(): Promise<ContactData> {
    return apiClient.get<ContactData>('/home/contacte/');
  },
  async sendContactMessage(formData: ContactFormData): Promise<any> {
    return apiClient.post('/admins/contacte/ajouter/', formData);
  },
};
 