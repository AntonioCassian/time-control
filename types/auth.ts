export type User = {
  id: string;
  name: string;
  email: string;
  // adicione outros campos do usuário se precisar
};

export type LoginDTO = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};