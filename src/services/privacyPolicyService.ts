import { apiClient } from './api';
import { PrivacyPolicyData } from '@/types/privacyPolicy';

export const privacyPolicyService = {
  async getPrivacyPolicy(): Promise<PrivacyPolicyData | null> {
    const response = await apiClient.get<{ data: PrivacyPolicyData[] }>('/home/politique_confidentialite/');
    const activePolicy = response.data.find(item => item.active === true);
    return activePolicy || null;
  },
};
