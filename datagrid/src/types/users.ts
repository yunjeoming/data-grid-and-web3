export interface CommonUser {
  name: string;
  age: number;
  phone: string;
}

export interface User extends CommonUser {
  id: string;
  createdAt: string;
}

export interface DeleteResponse {
  id: string;
  status: 'success' | 'error';
  err?: unknown;
}
