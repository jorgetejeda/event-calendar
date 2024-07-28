export interface UserCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  userName: string;
  email: string;
  userRoles: UserRole[];
  token: string;
  refreshToken: string;
}

export interface UserRole {
  id: number;
  status: string;
  role: Role;
}

export interface Role {
  title: string;
}
