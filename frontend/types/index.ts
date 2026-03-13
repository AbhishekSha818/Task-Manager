export interface User {
  id: string;
  email: string;
  username: string;
}

export interface Task {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface TaskResponse {
  message?: string;
  _id?: string;
  [key: string]: any;
}
