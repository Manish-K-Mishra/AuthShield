import { apiCLient } from './apiClient';

export type User = {
  id: string;
  name: string;
  email: string;
};

export async function fetchUser(userId: number): Promise<User> {
  const res = await apiCLient.get<User>(`/users/${userId}`);
  return res.data;
}
