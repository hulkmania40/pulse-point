import { _post } from "@/utils/crudService";

export interface SignupRequest {
  username: string;
  password: string;
  email?: string;
  mobile?: string;
}

interface SignupResponse {
  message: string;
  user_id: string;
}

export const signup = (data: SignupRequest): Promise<SignupResponse> => {
  return _post<SignupResponse, SignupRequest>('/auth/signup', data);
};

interface LoginRequest {
  identifier: string; // username or email
  password: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    id: string;
    username: string;
    role: 'viewer' | 'editor' | 'admin';
  };
}

export const login = (data: LoginRequest): Promise<LoginResponse> => {
  return _post<LoginResponse, LoginRequest>('/auth/login', data);
};
