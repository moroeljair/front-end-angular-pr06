export interface LoginRequest {
  email: string;
  password: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    usuario: Usuario;
  };
}
