import axios, { AxiosRequestConfig } from 'axios';
import { DeleteResponse, User } from '@/types/users';

const BASE_URL = 'http://localhost:9000';

const requestAxios = async (config: AxiosRequestConfig) => {
  config.baseURL = BASE_URL;

  try {
    const response = await axios(config);
    if (!response.status.toString().startsWith('2')) {
      throw Error('status num is not 200+');
    }
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const requestAxiosDelete = async (config: { url: string; id: string }): Promise<DeleteResponse> => {
  const { url, id } = config;
  const fullUrl = `${BASE_URL}${url}`;

  try {
    const response = await axios.delete(fullUrl);
    if (!response.status.toString().startsWith('2')) {
      throw Error('status num is not 200+');
    }
    return { id, status: 'success' };
  } catch (err) {
    return { id, status: 'error', err };
  }
};

export const UserService = {
  getUsers: async () => {
    const returnData = await requestAxios({ url: '/users' });
    return returnData;
  },
  addUser: async (data: Partial<User>) => {
    const returnData = await requestAxios({ url: '/users', method: 'POST', data });
    return returnData;
  },
  updateUser: async (id: string, data: Partial<User>) => {
    const returnData = await requestAxios({ url: `/users/${id}`, method: 'PATCH', data });
    return returnData;
  },
  deleteUser: async (id: string) => {
    const returnData = await requestAxiosDelete({ url: `/users/${id}`, id });
    return returnData;
  },
};
