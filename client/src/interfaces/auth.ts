export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  email: string;
}

export interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpResponse {
  email: string;
  password: string;
  otp: string;
}
