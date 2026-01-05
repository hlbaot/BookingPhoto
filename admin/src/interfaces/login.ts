export interface LoginRequest {
  email: string;
  password: string;
}

export interface Role {
  authority: string;
}

export interface LoginResponse {
  token: string;
  email: string;
  roleList: Role[];
}